import { Schema, model } from 'mongoose';
import dotenv from 'dotenv'


dotenv.config()

export interface TrgovinaSchema {
    name: String
    price: Number
}

const trgovinaModel = new Schema<TrgovinaSchema>({
    name: { type: String, required: true },
    price: { type: Number, required: true }
})

export const Trgovina = model<TrgovinaSchema>('trgovina', trgovinaModel);

