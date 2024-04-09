import { AuthService } from "./auth"


const url: string = 'http://localhost:4000'
export const authservice:AuthService = new AuthService(`${url}/user`)