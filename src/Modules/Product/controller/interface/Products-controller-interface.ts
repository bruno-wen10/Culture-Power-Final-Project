import { Request, Response } from "express"
import { Product } from "../../model/Products"
import { ProductsDTO } from "../../model/dto/Products-DTO"

export interface IProductsController {
    getAll(req: Request, res: Response):Promise<void>,
    getById(req: Request, res: Response):Promise<void>,
    create(req: Request, res: Response):Promise<void>,
    update(req: Request, res: Response):Promise<void>,
    //softDelete(req: Request, res: Response):Promise<void>
}