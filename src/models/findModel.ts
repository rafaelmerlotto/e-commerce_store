import dbConnect from '../config/dbConnect';
import validateMongodb from '../utils/validateMongodb';
import { Trgovina, TrgovinaSchema } from './createModel';

async function findItems(_id: string): Promise<TrgovinaSchema | null> {
    await dbConnect();
    validateMongodb(_id)
    const queryString = await Trgovina.findById(_id)
    return queryString
}


export default findItems