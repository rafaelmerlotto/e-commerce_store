import { Schema, model } from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

export  interface JwtKeys{
    privateKey: string;
    publicKey: string;
}

const jwtModel = new Schema <JwtKeys>({
    publicKey: {type: String, required:true},
    privateKey: {type: String, required:true}
})

export const Jwt = model<JwtKeys>('jwt', jwtModel);3