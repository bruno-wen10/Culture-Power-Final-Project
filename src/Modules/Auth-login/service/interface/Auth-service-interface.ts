import { LoginDTO } from "../../dtos/Login-DTO";



export interface IAuthServiceInterface{
    login(loginData:LoginDTO ):Promise<string>
}