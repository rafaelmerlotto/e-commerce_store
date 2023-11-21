import { StoreSchema, Store } from "../models/storeModel";
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
export async function createItem(name: string, price: number, emailAdmin: string): Promise<StoreSchema | null> {
    await dbConnect();
    const item = new Store({
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
    const items = await Store.find(list)
    return items
}

//get item by id
 export async function findItem(_id: string): Promise<StoreSchema | null> {
    await dbConnect();
    validateMongodb(_id)
    const getItem = await Store.findById(_id)
    return getItem
}

// update item
export async function updateItem(_id: string, name: string, price: number): Promise<StoreSchema | null> {
    await dbConnect();
    validateMongodb(_id)
    const updateArticle = await Store.findByIdAndUpdate(_id, { $set: { name: name, price: price }})
    return updateArticle
}


//delete item
export async function deleteItem(_id: string): Promise<StoreSchema | null> {
    await dbConnect();
    validateMongodb(_id)
    const deleteArticle = await Store.findByIdAndDelete(_id)
    return deleteArticle
}



