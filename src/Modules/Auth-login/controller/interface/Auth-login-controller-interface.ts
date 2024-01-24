import { Request, Response } from "express";


export interface IAuthControllerInterface{
    login(req:Request, res:Response):Promise<void>
}