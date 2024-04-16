import { DataUserRegistred } from "../pages/FormRegistred"
import { RegisterData } from "../pages/Register"


export class AuthService {
    
    public iToken: string | undefined | any

    constructor(private readonly url: string) { }

    get token() {
        return this.iToken
    }

    async login(email: string, password: string): Promise<boolean> {
        const res = await fetch(`${this.url}/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        if (res.ok) {
            const data: { accessToken: string } = await res.json()
            this.iToken = data.accessToken
            return true
        }
        return false
    }

    async register (fullName: string, email: string, password: string): Promise<boolean>{
        const res = await fetch(`${this.url}/register`,{
            method:'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({fullName: fullName, email: email, password: password})
        })
        if (res.ok) {
          return  await res.json()  
        }
        return false
    }

    async infoUser (): Promise<RegisterData| null>{
        const res = await fetch(`${this.url}/info`,{
            method:'Post',
            headers:{
                'content-type': 'application/json',
                authorization: this.iToken
            },
        })
        if (res.ok) {
          const data= await res.json() 
          console.log(data.msg)
          return data.msg
        }
        return null
    }

}