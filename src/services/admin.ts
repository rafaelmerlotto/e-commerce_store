import dbConnect from "../config/dbConnect";
import { Admin, AdminSchema } from "../models/adminModel";


export async function loginAdmin(email: string, password: string, token: string, verified: boolean): Promise<AdminSchema | null>{
    await dbConnect()
    const admin = await Admin.findOne({email: email, password: password, token: token, verified: verified })
    return admin
}