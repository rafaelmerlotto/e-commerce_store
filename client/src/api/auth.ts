

export class AuthService {
    
    private iToken: string | undefined

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

    async register (name: string, email: string, password: string): Promise<boolean>{
        const res = await fetch(`${this.url}/register`,{
            method:'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({name: name, email: email, password: password})
        })
        return res.ok
    }

}