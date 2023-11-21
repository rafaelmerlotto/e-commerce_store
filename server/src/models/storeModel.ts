import { Schema, model } from 'mongoose';
import dotenv from 'dotenv'


dotenv.config()

export interface StoreSchema {
    name: String
    price: Number
}

const trgovinaModel = new Schema<StoreSchema>({
    name: { type: String, required: true, default: 'Cutting board home-made' },
    price: { type: Number, required: true, default: 100 },
})

export const Store = model<StoreSchema>('trgovina', trgovinaModel);

