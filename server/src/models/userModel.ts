import { Schema, model } from 'mongoose';
import dotenv from 'dotenv'


dotenv.config();

export interface UserSchema {
    email: String
    password: String
    name: string
    address: string
    orders: [{
        quantity: Number
    }]


}

const userModel = new Schema<UserSchema>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String },
    orders: [{
        quantity: { type: Number }
    }],
})



export const User = model<UserSchema>('user', userModel)