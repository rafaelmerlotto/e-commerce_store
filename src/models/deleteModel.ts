import dbConnect from "../config/dbConnect";
import { Trgovina, TrgovinaSchema } from "./createModel";
import validateMongodb from "../utils/validateMongodb";


async function deleteItem(_id: string): Promise<TrgovinaSchema | null> {
    await dbConnect();
    validateMongodb(_id)
    const deleteArticle = await Trgovina.findByIdAndDelete(_id)
    return deleteArticle
}

export default deleteItem