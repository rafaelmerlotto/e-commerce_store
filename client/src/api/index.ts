import { AuthService } from "./auth"
import { AuthUserNotRegistred } from "./authUserNotRegistred"
import { AuthUserRegistred } from "./authUserRegistred"


const url: string = 'http://localhost:4000'
export const authservice:AuthService = new AuthService(`${url}/user`)
export const authserviceUserNotRegistred:AuthUserNotRegistred = new AuthUserNotRegistred(`${url}/userNotRegistred`)
export const authserviceUserRegistred:AuthUserRegistred = new AuthUserRegistred(`${url}/userRegistred`)