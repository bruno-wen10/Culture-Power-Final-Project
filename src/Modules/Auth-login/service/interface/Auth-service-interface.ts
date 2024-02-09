import { User } from "../../../User/model/User";
import { LoginDTO } from "../../dtos/Login-DTO";



export interface IAuthServiceInterface{
    login(loginData:LoginDTO ):Promise<string>
    getByUserLogged(idLogged:string):Promise<User | null>
}