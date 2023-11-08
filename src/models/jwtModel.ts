import { Schema, model } from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

export interface JwtSchema {
    privateKey: string;
    publicKey: string;
    accessToken: string
}

const jwtModel = new Schema<JwtSchema>({
    privateKey:{type:String, required:true},
    publicKey:{type:String, required:true},
    accessToken:{type:String, required:true}
})

export const Jwt = model<JwtSchema>('jwt', jwtModel)