import { Request, Response } from "express";
import { IUserServiceInterface } from "../service/interface/User-service-interface";
import { IUserController } from "./interface/User-controller-interface";
import { authBodyValidatorYup } from "../../Auth-login/utils/Auth-body-validator-YUP";


export class UserController implements IUserController {
  constructor(private service: IUserServiceInterface) {}
  async getByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.query;
      const result = await this.service.getByEmail(email as string);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json(error);
    }
  }

  async getById(req: Request, res: Response): Promise<void> {

    try {
      const { id } = req.params;
      const result = await this.service.getById(id as string);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  
  async create(req: Request, res: Response): Promise<void> {

    try {
      const { body } = req;
      console.log(body)
      await authBodyValidatorYup.validate(body, {abortEarly: false})
      const result = await this.service.create(body, );
      res.status(201).json({ message: 'User created successfully', user: body });
    } catch (error: any) {
      res.status(500).json(error);
    }
  }

  async updateUserRoleToAdmin(req:Request, res:Response): Promise<void>{
    try {
      const {id} = req.params
      const {body}= req
     
      const result = await this.service.updateUserRoleToAdmin(id, body)
      res.status(200).json(result)
    } catch (error:any) {
      res.status(500).json(error)      
    }
  }
  async sendJewelryToUser(req:Request, res:Response): Promise<void>{
    try {
      const {id}= req.params
      const { body } = req
      
      console.log(body)
      const result = await this.service.sendJewelryToUser(id, body)
      res.status(200).json({ message: 'Jewels sent successfully', result })
      
    } catch (error:any) {
      res.status(500).json(error)      
    }
  }
  async updateUser(req:Request, res:Response): Promise<void>{
    console.log('chegou no Controler')
  try {
      const {id}= req.params
      const {body}= req
      const result = await this.service.updateUser(id, body)
      res.status(200).json(result)
  } catch (error:any) {
      res.status(500).json(error)        
  }
}

  async addProducts(req:Request, res:Response): Promise<void>{
    try {
      const {idUser, idProducts} = req.body
      console.log("chegou no Controler", req.body)
        const result = await this.service.addProducts(idUser, idProducts)
        res.status(200).json(result)        
    } catch (error: any) {
        res.status(500).json({message: error.message})        
    }
  }

  async softDelete(req:Request, res:Response): Promise<void>{
    try {
        const {id} = req.params
        
        const result = await this.service.softDelete(id)
        res.status(200).json(result)            
    } catch (error:any) {
        res.status(500).json({error})            
    }        
}
}
