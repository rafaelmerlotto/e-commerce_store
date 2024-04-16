import express, { Router, Response, Request } from 'express'
import { prisma } from '../utils/prisma';
import { configDotenv } from 'dotenv';
import { UserNotRegistred } from '@prisma/client';


configDotenv({ path: ".env" })

const userNotRegistred: Router = express.Router();


userNotRegistred.post("/registerforPayment", async (req: Request, res: Response) => {
    const { requestId, email, name, surname, country, postCode, stateProvince, city, address, tel } = req.body
    const user: UserNotRegistred | null = await prisma.userNotRegistred.create({
        data: {
            requestId: requestId,
            email: email,
            name: name,
            surname: surname,
            country: country,
            postCode: postCode,
            stateProvince: stateProvince,
            city: city,
            address: address,
            tel: tel
        }
    })
    if (!user) {
        return res.status(403).send({ msg: 'Cannot register User info por payment', valid: false })
    }
    return res.status(201).send({ msg: user, valid: true })
})

userNotRegistred.get("/info/:requestId", async (req:Request, res:Response) => {
    const { requestId } = req.params
    const user: UserNotRegistred | null = await prisma.userNotRegistred.findUnique({
        where: {
            requestId: requestId
        }
    })
    if (!user) {
        return res.status(404).send({ msg: 'Cannot find request', valid: false })
    }
    return res.status(200).send({ msg: user })
})

export {userNotRegistred}