import { authservice } from "."
import { DataUserRegistred } from "../pages/FormRegistred"




export class AuthUserRegistred {

  
    constructor(private readonly url: string) { }

    async registerForPayment
        (requestId: string, email: string, name: string, surname: string, country: string, postCode: string, stateProvince: string, city: string, address: string, tel: string): Promise<DataUserRegistred | null > {
        const res = await fetch(`${this.url}/registerForPayment`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
             authorization: authservice.iToken
            },
            body: JSON.stringify({ requestId, email, name, surname, country, postCode, stateProvince, city, address, tel })
           
        })
        if (res.ok) {
            return await res.json()
      
        }
        return null
    }

    async getUserForPayment(): Promise<DataUserRegistred | null> {
        const res = await fetch(`${this.url}/info`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: authservice.iToken
            },            
        })
        if (res.ok) {
            const data = await res.json()
            return data.msg
        }
        return null
    }
}