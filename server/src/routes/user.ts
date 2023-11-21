import express from 'express'
import {User, UserSchema } from '../models/userModel';
import { loginUser, orderList, registerUser } from '../services/userService';
import jwt from 'jsonwebtoken'
import dbConnect from '../config/dbConnect';




const user = express();


function getExpirationTime(minutes: number): number {
    const now: number = Math.trunc(new Date().getTime() / 1000);
    return now + (minutes * 60);
}



user.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user: UserSchema | null = await loginUser(email, password)
    console.log(user)
    if (!user) {
        return res.status(403).send({ msg: 'Invalid authentication', check: false })
    }
    const token = jwt.sign({ email: email }, <string>process.env.JWT_PRIVATE, {
        expiresIn: getExpirationTime(60),
        algorithm: 'HS256'
    })
    if (!jwt.verify(token, <string>process.env.JWT_PRIVATE)) {
        return null
    }
    return res.status(200).send({
        msg: `Hello ${user.name} `,
        check: true,
        accessToken: token
    })
})



user.post('/register', async (req, res) => {
    const { email, password, name, address, orders } = req.body
    const user = await registerUser(email, password, name, address, orders)
    if (!user) {
        return res.status(403).send({ msg: 'Cannot register User', check: false })
    }
    return res.status(201).send({ msg: `Hello ${user.name}, welcome!`, check: true })
})



user.get('/orders/:id', async (req, res)=> {
    await dbConnect()
    const {id} = req.params
    const user = await orderList(id)
    if (!user) {
        return res.status(403).send({ msg: 'Cannot find orders', check: false })
    }
    return res.status(200).send({ msg: ` ${user.orders}`, check: true })
})


export { user }
