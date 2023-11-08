
import dbConnect from "../config/dbConnect";
import { Admin, AdminSchema } from "../models/adminModel";
import bcrypt, { compareSync } from 'bcrypt'


export async function loginAdmin
    (email: string, password: string): Promise<AdminSchema | null> {
    await dbConnect()
    const admin: AdminSchema | null = await Admin.findOne({ email: email })
    if (!compareSync(password, <string>process.env.PASSWORD_HASH)){
        return null
    }
    if (!admin) {
        return null
    }
    return admin
}



export async function createAdmin
    (email: string, password: string, verified: boolean): Promise<AdminSchema | null> {
    await dbConnect()
    const passwordHash: string = bcrypt.hashSync(password, 10)
    const admin = await Admin.create({ email: email, password: passwordHash, verified: verified })
    return admin
}
