import { Request, Response } from "express";

export interface IUserController {
    getByEmail(req: Request, res: Response): Promise<void>
    getById(req: Request, res: Response): Promise<void>
    create(req: Request, res: Response): Promise<void>
    addProducts(req:Request, res:Response): Promise<void>
    updateUser(req:Request, res:Response): Promise<void>
    softDelete(req:Request, res:Response): Promise<void>

}