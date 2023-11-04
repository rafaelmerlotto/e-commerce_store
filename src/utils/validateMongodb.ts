import mongoose from "mongoose";

const validateMongodb = (_id: any) =>{
    const  isValid = new mongoose.Types.ObjectId(_id);
    if(!isValid) throw new Error('This id is not valid or not found')
}

export default validateMongodb
