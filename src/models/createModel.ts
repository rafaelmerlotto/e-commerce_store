import { Schema, model } from 'mongoose';
import dotenv from 'dotenv'
import dbConnect from '../config/dbConnect';

dotenv.config()

export interface TrgovinaSchema {
    name: String,
    price: Number
}

 const trgovinaModel = new Schema<TrgovinaSchema>({
    name: { type: String , required: true },
    price: { type: Number, required: true }
})

export const Trgovina = model<TrgovinaSchema>('trgovina', trgovinaModel);


async function createItem(name: string, price: number): Promise<TrgovinaSchema | null> {
    await dbConnect();
    const item = new Trgovina({
        name: name,
        price: price
    })
   return await item.save()
}

export default createItem