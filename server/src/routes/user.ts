import express, { Router, Response, Request } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt, { compareSync } from 'bcrypt';
import { prisma } from '../utils/prisma';
import { JwtKey, User } from '@prisma/client';
import { getToken } from '../utils/key';
import { configDotenv } from 'dotenv';
import { checkJwt } from '../utils/checkJwt';



configDotenv({ path: ".env" })

const user: Router = express.Router();


async function verifyUser(email: string, password: string): Promise<User | false> {
    const user: User | null = await prisma.user.findUnique({
        where: {
            email: email,
        },
        include: {
            jwt: true
        }
    })
    if (!user) {
        return false
    }
    if (!compareSync(password, user.password)) {
        return false
    }
    return user
}

async function generateJwt(user: User): Promise<string> {
    const jwtKeys: JwtKey = await getToken(user);
    return jwtKeys.accessToken;
}



user.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user: User | false = await verifyUser(email, password)
    if (!user) {
        return res.status(400).send({ msg: 'Authentication not valid', valid: false })
    }
    if (!compareSync(password, user.password)) {
        return null
    }
    const token: string = await generateJwt(user)

    return res.status(200).send({ msg: `Hello ${user.fullName}`, valid: true, accessToken: token })
})




user.post('/register', async (req: Request, res: Response) => {
    const { email, password, fullName } = req.body;
    const passwordHash: string = bcrypt.hashSync(password, 5)
    const user: User | null = await prisma.user.create({
        data: {
            email: email,
            password: passwordHash,
            fullName: fullName
        }
    })
    if (!user) {
        return res.status(403).send({ msg: 'Cannot register User', valid: false })
    }
    return res.status(201).send({ msg: `Hello ${user.fullName}, welcome!`, valid: true })
})


user.post("/info", async (req:Request, res: Response) => {
    const {email, fullName} = req.body;
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
    const infoUser : User | null  = await prisma.user.findUnique({
        where:{
            id: user.id
        }
    })
    if (!user) {
        return res.status(403).send({ msg: 'Cannot get info User', valid: false })
    }
    return res.status(201).send({ msg: infoUser, valid: true })
})


export { user }
