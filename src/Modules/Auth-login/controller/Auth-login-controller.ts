import { Response, Request } from "express";
import { authBodyValidatorYup } from "../utils/Auth-body-validator-YUP";
import { IAuthServiceInterface } from "../service/interface/Auth-service-interface";
import { IAuthControllerInterface } from "./interface/Auth-login-controller-interface";
import { User } from "../../User/model/User";
import jwt, { JwtPayload } from "jsonwebtoken";



export class AuthController implements IAuthControllerInterface {

    constructor(private authService: IAuthServiceInterface){}
    async login(req:Request, res:Response):Promise<void>{
        console.log()
        try {
            const {body}= req   
            await authBodyValidatorYup.validate(body, {abortEarly: false})
             const resultToken = await this.authService.login(body)
             res.status(200).json(resultToken)   
        } catch (error:any) {
            res.status(500).json(error)            
        }
    }

    async getByUserLogged (req:Request, res:Response): Promise<void>{

        function getUserIdFromToken(req: Request){

            if (req.headers.authorization) {
                const token = req.headers.authorization.split(' ')[1]; 
                const payload = jwt.decode(token) as any
               if(!payload) throw new Error("Invalid token")
                return req.body = {id: payload._doc._id}
            } else {
                
                throw new Error('Authorization header not found');
            }
        }

       
        try {
            console.log(req)
            
            const idUser = getUserIdFromToken(req)
            console.log(idUser)
            const userId: string = idUser.id 

            const result = await this.authService.getByUserLogged(userId)

            res.status(200).json(result)

        } catch (error:any) {
            res.status(500).json({message: error.message})           
        }
    }
}