import { Response, Request } from "express";
import { authBodyValidatorYup } from "../utils/Auth-body-validator-YUP";
import { IAuthServiceInterface } from "../service/interface/Auth-service-interface";
import { IAuthControllerInterface } from "./interface/Auth-login-controller-interface";



export class AuthController implements IAuthControllerInterface {

    constructor(private authService: IAuthServiceInterface){}
    async login(req:Request, res:Response):Promise<void>{
        try {
            const {body}= req   
            await authBodyValidatorYup.validate(body, {abortEarly: false})
             const resultToken = await this.authService.login(body)
             res.status(200).json(resultToken)   
        } catch (error:any) {
            res.status(500).json(error)            
        }
    }
}