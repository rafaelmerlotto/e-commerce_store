import { configDotenv } from "dotenv";
import express, { Router, Response, Request } from "express"
import { prisma } from "../utils/prisma";
import bcrypt, { compareSync } from 'bcrypt'
import { Admin } from "@prisma/client";
import { verifyAdmin } from "../utils/VerifyAdmin";


configDotenv({ path: ".env" })
const admin: Router = express.Router()

admin.post("/create", async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const passwordHash: string = bcrypt.hashSync(password, 6)
    const token_hash: string = bcrypt.hashSync(process.env.ADMIN_TOKEN!, 4)
    const admin: Admin | null = await prisma.admin.create({
        data: {
            name: name,
            email: email,
            password: passwordHash,
            adminToken: token_hash
        }
    })
    if (!admin) {
        return res.status(403).send({ msg: "Cannot create admin account", valid: false })
    }
    return res.status(200).send({ msg: "Created admin account successfully", admin: admin, valid: true })
})




admin.post("/login", async (req: Request, res: Response) => {
    const { email, password, adminToken } = req.body
    const admin: Admin | false = await verifyAdmin(email, password, adminToken);
    if (!admin) {
        return res.status(404).send({ msg: "Authentication not valid", valid: false })
    }
    return res.status(200).send({ msg: "Admin have successfully logged in", valid: true })
})

export { admin }