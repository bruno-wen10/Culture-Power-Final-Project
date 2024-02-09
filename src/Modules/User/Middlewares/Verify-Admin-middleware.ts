import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'

export class VerifyAdmin {

    static isAdmin(req:Request, res:Response, next: NextFunction){
        //console.log('rodou!')
        const token = req.headers.authorization?.split(' ')[1]
        //console.log(req.headers.authorization)
        if(!token) return res.status(403).json({message: 'Token not provided'})

        try {
             
            const decodeToken = jwt.decode(token) as JwtPayload
            //console.log(decodeToken)
            if(decodeToken  && decodeToken._doc.role !== 'admin'){
                //console.log("decodeToken", decodeToken.payload._doc.role)
                throw new Error("Invalid token")
                //return res.status(403).json({message: "Invalid token"})
            }
            
        } catch (error:any) {
            //console.log(error)
            res.status(401).json({ message: error });                        
        }

        next()
    }
}