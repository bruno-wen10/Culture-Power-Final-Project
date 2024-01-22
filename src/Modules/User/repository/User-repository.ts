import { Model, isValidObjectId } from "mongoose";
import { User } from "../model/User";
import {IUserRepositoryInterface} from './interface/User-repository-interface'
import { UpdateUserDTO } from "../model/dto/User-dto";

export class UserRepository implements IUserRepositoryInterface {
    constructor(private userModel: Model<User>){}

   async getByEmail (email: string): Promise<User | null> {
    const userEmail = await this.userModel.findOne(
        {
            email: email,
            deletedAt: null
        }
    ).populate('products')
    
    return userEmail
}

    async getById (id: string):Promise<User | null>{
        const userId = await this.userModel.findOne({_id: id, deletedAt: null}) 
        return  userId

    }
   async create (userData: User):Promise<User | null> {
        const newUser = await this.userModel.create(userData)
        return newUser
   }

   async updateUser (id: string, newUser: UpdateUserDTO):Promise<User | null>{
    if(!isValidObjectId(id)){
        throw new Error(`Id ${id} is not valid`)
    }
    const update = await this.userModel.findByIdAndUpdate(id, newUser,{new: true})
    return update
   }
}