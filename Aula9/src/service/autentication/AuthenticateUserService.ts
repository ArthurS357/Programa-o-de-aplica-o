import {compare} from "bcryptjs"; //comparar entre as criptografias
import {hash} from "bcryptjs"; //
import {sign} from "jsonwebtoken";
import { IAuthenticateRequest } from "../../interface/IAuthenticateRequest";
const nodemailer = require('nodemailer');

class AuthenticateUserService{
    async execute ({email, password}: IAuthenticateRequest){
       const passwordHash = await hash ("umc2024", 8);
       const passwordMatch = await compare(password, passwordHash);
       if (!passwordMatch) {
        throw new Error("Password Incorrect");
       }
       // gerar token
       const token = sign(
        {
            email:email,
        },
        "UMC-EngSoftware-2024",
        {
            subject: ("others"),
            expiresIn:"1d",
        }
       );
       return token;
    }
}

export {AuthenticateUserService}