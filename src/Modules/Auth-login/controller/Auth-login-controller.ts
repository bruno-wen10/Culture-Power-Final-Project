import { Response, Request } from "express";
import { authBodyValidatorYup } from "../utils/Auth-body-validator-YUP";
import { IAuthServiceInterface } from "../service/interface/Auth-service-interface";
import { IAuthControllerInterface } from "./interface/Auth-login-controller-interface";
import { User } from "../../User/model/User";



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
        try {
            console.log(req)
            const {id} = req.body
            const result = await this.authService.getByUserLogged(id)

            res.status(200).json(result)

        } catch (error:any) {
            res.status(500).json({message: error.message})           
        }
    }
}