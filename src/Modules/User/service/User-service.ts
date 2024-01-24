import { isValidObjectId } from "mongoose";
import { UpdateUserDTO, userDTO } from "../model/dto/User-dto";
import { IUserRepositoryInterface } from "../repository/interface/User-repository-interface";
import { IUserServiceInterface } from "./interface/User-service-interface";
import { User } from "../model/User";
import bcrypt from 'bcrypt'

export class UserService implements IUserServiceInterface {
  constructor(private userRepository: IUserRepositoryInterface) {}

  async getByEmail(email: string): Promise<User | null> {
    const userEmail = await this.userRepository.getByEmail(email);

    if (!userEmail) throw new Error("Email not found");

    return userEmail;
  }

  async getById(id: string): Promise<User | null> {
    if (!isValidObjectId(id)) throw new Error("Invalid id");

    const userId = await this.userRepository.getById(id);
    if (!userId) throw new Error("User not found");
    return userId;
  }
  async create(userData: userDTO): Promise<User | null> {
    const { email } = userData;
    const userAlreadyExist = await this.userRepository.getByEmail(
      email as string
    );
    
    if (userAlreadyExist) throw new Error("User already exist");

    // Criptografar a senha antes de armazenar no banco de dados
    userData.password = await bcrypt.hash(userData.password as string, 10)
    const newUser = await this.userRepository.create(userData);
    if (!newUser) {
      throw new Error("User not created");
    }
    return newUser;
  }
  async addProducts(idUser: string, idProducts: string):Promise<User> {

    const userId = await this.getById(idUser);
    if (!userId) throw new Error("error: invalid id");

      const products = await this.userRepository.addProducts(idUser, idProducts)
      return products

  }
  async updateUser(id: string, newUser: UpdateUserDTO): Promise<User | null> {
    if (!isValidObjectId(id)) throw new Error("Invalid id");

    const user = await this.getById(id);
    if (!user) throw new Error("error: invalid id");

    const updatedUser = await this.userRepository.updateUser(id, newUser);
    if (!updatedUser) {
      throw new Error("error: cant update team");
    }
    return updatedUser;
  }

  async softDelete(id: string): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new Error("Invalid Id");
    }
    const team = await this.getById(id);
    if (!team) {
      throw new Error("error: Invalid or does not match any existing user.");
    }
    const deletedUser = await this.userRepository.softDelete(id)
    if(!deletedUser) throw new Error('cant delete team')
    return deletedUser 
  }
}
