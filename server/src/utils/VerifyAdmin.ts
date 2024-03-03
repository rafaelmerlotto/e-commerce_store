import { Admin } from "@prisma/client"
import { prisma } from "./prisma"
import { compareSync } from "bcrypt"


export async function verifyAdmin(email: string, password: string, adminToken: string): Promise<Admin | false> {
    const admin: Admin | null = await prisma.admin.findUnique({
        where: {
            email: email
        },
    })
    if (!admin) {
        return false
    }
    if (!compareSync(password, admin.password)) {
        return false
    }
    if (!compareSync(adminToken, admin.adminToken)) {
        return false
    }
    return admin
}

export async function checkAdmin(secret_number: string, email: string): Promise<Admin | null> {
    try {
        const admin: Admin | null = await prisma.admin.findUnique({
            where: {
                email: email,
            }
        })
        if (!compareSync(secret_number, admin!.adminToken)) {
            return null
        }
        if (admin!.email !== email) {
            return null
        }
        console.log(secret_number)
        return <Admin >admin;
    } catch (err) {
        return null
    }
}