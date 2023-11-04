import dbConnect from "../config/dbConnect";
import { Trgovina, TrgovinaSchema } from "./createModel";
import validateMongodb from "../utils/validateMongodb";


async function updateItem(_id: string, name: string, price: number): Promise<TrgovinaSchema | null> {
    await dbConnect();
    validateMongodb(_id)
    const updateTest = await Trgovina.findByIdAndUpdate(_id, { Set: { name: name, price: price } })
    return updateTest
}

export default updateItem