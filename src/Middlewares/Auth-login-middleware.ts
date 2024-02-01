import { Request, Response } from "express";
import jwt from "jsonwebtoken";


export class AuthMiddleware {
    static async handler(req:Request, res: Response, next:Function){
        const {headers} = req

        if(!headers.authorization){
            return res.status(401).json({message: "Unauthorized"}) 
        }
        const [token] = headers.authorization.split('')
        try {
            jwt.verify(token, process.env.JWT_SECRET_KEY as string)
        } catch (error:any) {
            res.status(401).json({message: "Unauthorized"})            
        }

        next()
    }
}