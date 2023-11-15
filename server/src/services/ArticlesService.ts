import { TrgovinaSchema, Trgovina } from "../models/trgovinModel";
import dbConnect from "../config/dbConnect";
import validateMongodb from "../utils/validateMongodb";
import { Admin, AdminSchema } from "../models/adminModel";



async function verifyAdmin(email: string): Promise <AdminSchema | null>{
    await dbConnect();
    const admin : AdminSchema | null = await Admin.findOne({email:email})
    if(!admin){
        return null
    }
    return admin
}



// Create item
export async function createItem(name: string, price: number, emailAdmin: string): Promise<TrgovinaSchema | null> {
    await dbConnect();
    const item = new Trgovina({
        name: name,
        price: price
    })
    const admin = await verifyAdmin(emailAdmin)
    if(!admin){
        return null
    }
    return await item.save()
}

// Get all items
export async function items(list: {}): Promise<any | null> {
    await dbConnect();
    const items = await Trgovina.find(list)
    return items
}

//get item by id
 export async function findItem(_id: string): Promise<TrgovinaSchema | null> {
    await dbConnect();
    validateMongodb(_id)
    const getItem = await Trgovina.findById(_id)
    return getItem
}

// update item
export async function updateItem(_id: string, name: string, price: number): Promise<TrgovinaSchema | null> {
    await dbConnect();
    validateMongodb(_id)
    const updateArticle = await Trgovina.findByIdAndUpdate(_id, { $set: { name: name, price: price }})
    return updateArticle
}


//delete item
export async function deleteItem(_id: string): Promise<TrgovinaSchema | null> {
    await dbConnect();
    validateMongodb(_id)
    const deleteArticle = await Trgovina.findByIdAndDelete(_id)
    return deleteArticle
}



