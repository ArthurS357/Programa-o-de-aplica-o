import {Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";
interface IPayload {
    sub: string;
    email:string;
}
export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    //receber token
    const authToken = request.headers.authorization;
    //validar se token está preenchido
    if (!authToken) {
        return response.status(401).end();
    }
    const [, token] = authToken.split("");
    try {
        //validar se token é valido
        const {sub,email} = verify(
            token,  "UMC-EngSoftware-2024" 
        ) as IPayload;
        return next ();
    } catch (err) {
        return response.status(401).end();
    }
}