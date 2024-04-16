import { DataUserNotRegistred } from "../pages/FormNotRegistred"



export class AuthUserNotRegistred {

    constructor(private readonly url: string) { }

  
    async registerForPayment
        (requestId: string, email: string, name: string, surname: string, country: string, postCode: string, stateProvince: string, city: string, address: string, tel: string): Promise<DataUserNotRegistred | null> {
        const res = await fetch(`${this.url}/registerForPayment`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ requestId, email, name, surname, country, postCode, stateProvince, city, address, tel })
        })
        if (res.ok) {
            return await res.json()
        }
        return null
    }

    async getUserForPayment(requestId: string): Promise<DataUserNotRegistred | null> {
        const res = await fetch(`${this.url}/info/${requestId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },            
        })
        if (res.ok) {
            const data = await res.json()
            return data.msg
        }
        return null
    }
}