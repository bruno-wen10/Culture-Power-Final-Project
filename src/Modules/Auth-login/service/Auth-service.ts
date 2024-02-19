import { IUserRepositoryInterface } from "../../User/repository/interface/User-repository-interface";
import {IAuthServiceInterface} from './interface/Auth-service-interface'
import { LoginDTO } from "../dtos/Login-DTO";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from "../../User/model/User";
import { isValidObjectId } from "mongoose";


export class AuthService implements IAuthServiceInterface {
    constructor(private userRepository: IUserRepositoryInterface){}

    async login(loginData:LoginDTO ):Promise<string>{
        
        const user = await this.userRepository.getByEmail(loginData.email)
        if(!user || !user.password) throw new Error('User not found')

        

        const userPassword = user.password as string

        const passwordMatch = await bcrypt.compare(loginData.password, userPassword)

        if(!passwordMatch) throw new Error('Email or password incorrect')

        //!passwordMatch? throw new Error('Email or password incorrect') : null

        // Para não enviar a senha para o frontEnd
        const {password, ...restUser} = user         

        const payload = {...restUser}
       
        const secretKey = process.env.JWT_SECRET_KEY as string
        const option = {expiresIn: '1d'}

        const token = jwt.sign(payload, secretKey, option)

        return token


        
    }

    
    async getByUserLogged(idLogged:string):Promise<User | null>{
        const user = await this.userRepository.getById(idLogged)
        return user 
    }
}