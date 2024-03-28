import { PayPalNamespace, loadScript } from "@paypal/paypal-js";
import dotenv from "dotenv";
import express, { Router, Request,Response } from "express";
import * as paypal from "../payment/paypal-api"
import { createOrder, capturePayment } from "../payment/paypal-api";

dotenv.config;
const payment: Router = express.Router();


payment.post("/api/orders", async (req: Request, res: Response) => {
    try {
        const { product } = req.body;
        const { jsonResponse, httpStatusCode } = await createOrder(product);
        res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).json({ error: "Failed to create order." });
    }
});


payment.post("/api/orders/:orderID/capture", async (req:Request, res:Response) => {
    try {
      const { orderID } = req.params;
      const { jsonResponse, httpStatusCode } = await capturePayment(orderID);
      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Failed to capture order." });
    }
  });

export { payment }