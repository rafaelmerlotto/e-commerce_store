import { Schema, model } from 'mongoose';
import dotenv from 'dotenv'


dotenv.config()

export interface TrgovinaSchema {
    name: String
    price: Number
    _user: Number
}

const trgovinaModel = new Schema<TrgovinaSchema>({
    name: { type: String, required: true, default: 'Tagliere home-made' },
    price: { type: Number, required: true, default: 100 },
    
    _user:{ type: Schema.Types.ObjectId, ref: 'user'}
})

export const Trgovina = model<TrgovinaSchema>('trgovina', trgovinaModel);

