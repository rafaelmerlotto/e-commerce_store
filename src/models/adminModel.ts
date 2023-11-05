import { Schema, model } from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

export interface AdminSchema {
    email: String
    password: String
    token:String
    verified: Boolean
}

const adminModel = new Schema<AdminSchema>({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    token: {type: String, required: true},
    verified: {type: Boolean, required: true}
})

export const Admin = model<AdminSchema>('admin', adminModel)