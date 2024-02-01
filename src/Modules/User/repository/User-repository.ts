import { Model, isValidObjectId } from "mongoose";
import { IUserRepositoryInterface } from "./interface/User-repository-interface";
import { UpdateUserDTO, userDTO } from "../model/dto/User-dto";
import { User } from "../model/User";

export class UserRepository implements IUserRepositoryInterface {
  constructor(private userModel: Model<User>) {}

  async getByEmail(email: string): Promise<User | null> {
   
    const userEmail = await this.userModel
      .findOne({
        email: email,
        deletedAt: null,
      })
      

    return userEmail;
  }

  async getById(id: string): Promise<User | null> {
    const userId = await this.userModel.findOne({ _id: id, deletedAt: null });
    return userId;
  }
  async create(userData: userDTO): Promise<User | null> {
    const newUser = await this.userModel.create(userData);

    return newUser;
  }

  async addProducts(idUser:string, idProducts:string){
    const products = await this.userModel.findByIdAndUpdate(idUser,{$push:{players:idProducts}}, {new: true})
    if(!products){
        throw new Error('Product could not be added')
    }
    
    return products 
}

  async updateUser(id: string, newUser: UpdateUserDTO): Promise<User | null> {
    const updateUser = await this.userModel.findByIdAndUpdate(id, newUser, {
      new: true,
    });
    if (!updateUser) {
      throw new Error("error: cant update User");
    }
    return updateUser;
  }

  async softDelete(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );
    if (!deletedUser) {
      throw new Error("cant delete User");
    }
    return deletedUser;
  }
}
