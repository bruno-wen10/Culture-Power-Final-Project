import { Request, Response } from "express";
import { IProductsService } from "../service/interface/Products-service-interface";
import { IProductsController } from "./interface/Products-controller-interface";
import { productsCreateValidatorYup } from "../utils/Products-Create-validator";



export class ProductsController implements IProductsController {
    constructor(private service: IProductsService){}
    async getAll(req: Request, res: Response):Promise<void> {
        console.log('rodou!')
        try {
            const result = await this.service.getAll();
            res.status(200).json(result);                        
        } catch (error: any) {
            res.status(500).json({message: error.message});                        
        }
        
    }
    async getById(req: Request, res: Response):Promise<void> {
        try {
            const { id } = req.params;
            const result = await this.service.getById(id);
            res.status(200).json(result);
        }catch (error: any) {
            res.status(500).json({message: error.message});
        }
    }
    async create(req: Request, res: Response):Promise<void> {
        try {
            const {body} = req;
            console.log(body)
            await productsCreateValidatorYup.validate(body, {abortEarly: false});
            const result = await this.service.create(body);
            res.status(201).json(result);
        } catch (error: any) {
            console.log(error)
            res.status(500).json({message: error.message});                        
        }        
    }
    async update(req: Request, res: Response):Promise<void> {
        try {
            const {id} = req.params;
            const {body} = req;
            console.log('chegou no Controler', req.body)
            const result = await this.service.update(id, body);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({message: error.message});            
        }       
    }
    async softDelete(req: Request, res: Response):Promise<void> {
        try {
            const {id} = req.params;
            const result = await this.service.softDelete(id);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({message: error.message});            
        }
    }
}