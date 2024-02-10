import { Request, Response } from "express";
import jwt from "jsonwebtoken";


export class AuthRoutePrivateMiddleware {
    static async handle(req:Request, res: Response, next:Function){
        const {headers} = req

        if(!headers?.authorization){
            return res.status(401).json({message: "Unauthorized"}) 
        }

        const token = headers.authorization.replace('Bearer ', '') 
        
         try {
            jwt.verify(token, process.env.JWT_SECRET_KEY as string) 
             const payload = jwt.decode(token) as any
            if(!payload) throw new Error("Invalid token")
            //req.body = {id: payload._doc._id}
            //req.body = [{id: payload._doc._id}, {...req.body}]
            /* return res.json({payload}) */          
        } catch (erro: any) {
            return res.status(401).json({message: "Invalid token"})
            
        }
        next()

    }
}