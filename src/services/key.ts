import { generateKeyPairSync } from "crypto";
import { Jwt, JwtKeys } from "../models/jwtModel";




function generateKeys(): JwtKeys {
    const keys = generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        },
    });
    return keys;
}

export async function getJwtKeys(): Promise<JwtKeys> {
    let keys = await Jwt.find()
        const genKeys = generateKeys();  
    return   await Jwt.create({ publicKey: genKeys.publicKey,privateKey: genKeys.privateKey});
}

