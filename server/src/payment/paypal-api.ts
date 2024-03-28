// import fetch from "node-fetch";
import dotenv from "dotenv";
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";

dotenv.config();


const generateAccessToken = async () => {
    try {
        if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
            throw new Error("Missing Api credentials")
        }
        const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,).toString("base64");
        const response = await fetch(`${base}/v1/oauth2/token`, {
            method: "POST",
            body: "grant_type=client_credentials",
            headers: {
                Authorization: `Basic ${auth}`
            }
        })
        const data = await response.json();
        return data.access_token;
    }catch(err){
        console.error("Failed to generate Access Token:", err);
    }

}



export const createOrder = async (data: any) => {
    const accessToken: string = await generateAccessToken();
    const url: string = `${base}/v2/checkout/orders`;
    const payload:  {} = {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "129.00",
            },
          },
        ],
      };
    
    const response: Response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
    });
    return handleResponse(response)
}

export const capturePayment= async(orderID: string) => {
    const accessToken: string = await generateAccessToken();
    const url: string = `${base}/v2/checkout/orders/${orderID}/capture`;

    const response: Response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        }
    });
    return handleResponse(response)

}

async function handleResponse(response: Response) {
    try {
      const jsonResponse = await response.json();
      return {
        jsonResponse,
        httpStatusCode: response.status,
      };
    } catch (err) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  }


