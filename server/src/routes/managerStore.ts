import { Admin, Store } from '@prisma/client';
import express, { Router, Request, Response } from 'express'
import { prisma } from '../utils/prisma';
import { configDotenv } from 'dotenv';
import { checkAdmin, verifyAdmin } from '../utils/VerifyAdmin';
import { compareSync } from 'bcrypt';


configDotenv({ path: ".env" })

const app: Router = express.Router();


// get all items
app.get('/', async (req: Request, res: Response) => {
    const result: Store[] | null = await prisma.store.findMany()
    if (!result || result.length === 0) {
        return res.status(404).send({ msg: 'there are not articles', valid: false })
    }
    return res.status(200).send({ articles: result, valid: true })
})

// find by id
app.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const result: Store | null = await prisma.store.findUnique({
        where: {
            id: id
        }
    })
    if (!result) {
        return res.status(404).send({ msg: 'Cannot article', valid: false })
    }
    return res.status(200).send({ msg: result })
})

//create item
app.post('/', async (req: Request, res: Response) => {
    const { name, price, adminToken, email } = req.body
    const result: Store | null = await prisma.store.create({
        data: {
            name: name,
            price: price
        }
    })
    const admin: Admin | null  = await  checkAdmin(adminToken, email)
    if(!admin){
        return res.status(500).send({ msg: 'Cannot create article, you are not Admin', valid: false })
    }
    if (!result) {
        return res.status(403).send({ msg: 'Cannot create article', valid: false })
    }
    return res.status(200).send({ msg: result, vadid: true })
})

// change item
app.put('/:id', async (req: Request, res: Response) => {
    const { name, price } = req.body;
    const { id } = req.params
    const result: Store | null = await prisma.store.update({
        where: {
            id: id
        },
        data: {
            name: name,
            price: price
        }
    })
    if (!result) {
        return res.status(404).send({ msg: 'Cannot change article', valid: false })
    }
    return res.status(200).send({ msg: result, valid: true })
})

//delete Item
app.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const result: Store | null = await prisma.store.delete({
        where: {
            id:id
        }
    })
    if (!result) {
        return res.status(404).send({ msg: 'Cannot delete article', valid: false })
    }
    return res.status(200).send({ msg: result, valid: true })
})



export { app }