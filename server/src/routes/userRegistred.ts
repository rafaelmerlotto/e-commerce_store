import express, { Router, Response, Request } from 'express'
import { prisma } from '../utils/prisma';
import { configDotenv } from 'dotenv';
import { User, UserRegistred } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import { checkJwt } from '../utils/checkJwt';


configDotenv({ path: ".env" })

const userRegistred: Router = express.Router();


userRegistred.post("/registerforPayment", async (req: Request, res: Response) => {
    const { requestId, email, name, surname, country, postCode, stateProvince, city, address, tel } = req.body
    const accessToken = req.headers.authorization
    const payload: JwtPayload | null = checkJwt(accessToken!);
    if (!payload) {
        return res.status(401).send({ msg: "Token not valid", valid: false });
    }
    const userId: string = payload.userId
    const user: User | null = await prisma.user.findUnique({
        where: {
            id: userId,
        }
    })
    if (!user) {
        return res.status(401).send({ msg: "User not valid", valid: false });
    }
    const userInfo: UserRegistred | null = await prisma.userRegistred.create({
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
            tel: tel,
            userId: userId
        }
    })
    if (!userInfo) {
        return res.status(403).send({ msg: 'Cannot register User info por payment', valid: false })
    }
    return res.status(201).send({ msg: userInfo, valid: true })
})

userRegistred.get("/info", async (req: Request, res: Response) => {
    const accessToken = req.headers.authorization
    const payload: JwtPayload | null = checkJwt(accessToken!);
    if (!payload) {
        return res.status(401).send({ msg: "Token not valid", valid: false });
    }
    const userId: string = payload.userId
    const user: User | null = await prisma.user.findUnique({
        where: {
            id: userId,
        }
    })
    if (!user) {
        return res.status(401).send({ msg: "User not valid", valid: false });
    }
    const userInfo: UserRegistred | null = await prisma.userRegistred.findUnique({
        where: {
            userId: userId
        }
    })
    if (!userInfo) {
        return res.status(404).send({ msg: 'Cannot find request', valid: false })
    }
    return res.status(200).send({ msg: userInfo })
})

export { userRegistred }