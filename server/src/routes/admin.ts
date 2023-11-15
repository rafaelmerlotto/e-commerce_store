import express from 'express'
import { createAdmin, loginAdmin } from '../services/adminService';
import { AdminSchema } from '../models/adminModel';


const admin = express();


admin.post('/login', async (req, res) => {
    const { email, password } = req.body
    const admin: AdminSchema| null  = await loginAdmin(email, password)
    if(email !== process.env.ADMIN || admin?.verified !== true){
        return res.status(500).send({ msg: 'you are not admin, please log in as a user', check: false })
    } 
    if (!admin) {
        return res.status(403).send({ msg: 'Invalid authentication' })
    }
    return res.status(200).send({ msg: `Hello ${admin.email} `, check: true })
})



admin.post('/create', async (req, res) => {
    const { email, password, verified } = req.body
    const admin = await createAdmin(email, password, verified);
    if (!admin) {
        return res.status(403).send({ msg: 'Cannot create admin', check: false })
    }
    return res.status(201).send({ msg: `Hello ${admin.email}, you are a new admin!`, check: true })
})



export { admin }