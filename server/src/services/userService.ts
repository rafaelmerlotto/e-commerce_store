import dbConnect from "../config/dbConnect";
import { User, UserSchema } from "../models/userModel";
import bcrypt, { compareSync } from 'bcrypt'
import validateMongodb from "../utils/validateMongodb";



export async function loginUser(email: string, password: string): Promise<UserSchema | null> {
    await dbConnect();
    const user: UserSchema | null = await User.findOne({ email: email })
    const isMatch = compareSync(password, <string>user?.password)
    if (!isMatch) {
        return null
    }
    return user
}


export async function registerUser(
    email: string, password: string, name: string, address: string, orders: []): Promise<UserSchema | null> {
    await dbConnect();
    const passwordHash: string = bcrypt.hashSync(password, 10)
    const user = await User.create({ email: email, password: passwordHash, name: name, address: address, orders: orders })
    return user
}




export async function orderList(_id: string): Promise<UserSchema | null> {
    await dbConnect();
 validateMongodb(_id)
    const user = await User.findById(_id)
    return user
}
