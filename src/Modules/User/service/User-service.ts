import { isValidObjectId } from "mongoose";
import { UpdateUserDTO, userDTO } from "../model/dto/User-dto";
import { IUserRepositoryInterface } from "../repository/interface/User-repository-interface";
import { IUserServiceInterface } from "./interface/User-service-interface";
import { User } from "../model/User";
import bcrypt from "bcrypt";
import { number, string } from "yup";
import { IProductsRepository } from "../../Product/repository/interface/Products-repository-interface";

export class UserService implements IUserServiceInterface {
  constructor(
    private userRepository: IUserRepositoryInterface,
    private productRepository: IProductsRepository
  ) {}

  async getByEmail(email: string): Promise<User | null> {
    console.log(`Buscando usuário por e-mail: ${email}`);
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
    userData.password = await bcrypt.hash(userData.password as string, 10);

    const newUser = await this.userRepository.create(userData);
    if (!newUser) {
      throw new Error("User not created");
    }
    return newUser;
  }
  async updateUserRoleToAdmin(
    userId: string,
    newAdmin: UpdateUserDTO
  ): Promise<User | null> {
    if (!isValidObjectId(userId)) throw new Error("Invalid id");

    const adminId = await this.userRepository.getById(userId);

    if (!adminId) throw new Error("error: invalid id");

    const admin = await this.userRepository.updateUserRoleToAdmin(
      userId,
      newAdmin
    );
    return admin;
  }
  async sendJewelryToUser(
    idUser: string,
    jewel: UpdateUserDTO
  ): Promise<User | null> {

    const userId = await this.userRepository.getById(idUser);
    if (!userId) throw new Error('User not found.');
    
    const user = await this.userRepository.sendJewelryToUser(idUser, jewel);
    return user;
  }
  async updateUser(id: string, newUser: UpdateUserDTO): Promise<User | null> {
    console.log("chegou no Serviço");
    if (!isValidObjectId(id)) throw new Error("Invalid id");

    const user = await this.userRepository.getById(id);
    if (!user) throw new Error("error: invalid id");

    // Criptografar a senha antes de armazenar no banco de dados
    newUser.password = await bcrypt.hash(newUser.password as string, 10);
    const updatedUser = await this.userRepository.updateUser(id, newUser);
    if (!updatedUser) {
      throw new Error("error: cant update User");
    }
    return updatedUser;
  }

  async addProducts(idUser: string, idProducts: string): Promise<User> {
    console.log("chegou no Serviço", idUser, idProducts);
    const userId = await this.userRepository.getById(idUser);

    const productsId = await this.productRepository.getById(idProducts);

    if (!userId || !productsId) throw new Error("User or product not found");

    if (
      typeof userId.jewelsAmount !== "number" ||
      typeof productsId.value !== "number"
    )
      throw new Error("invalid data type");

    //const userJewelsAmount = userId.jewelsAmount as number

    if (userId.jewelsAmount < productsId.value) {
      throw new Error("User does not have enough jewelry to redeem product");
    }

    if(productsId.Amount < 1) throw new Error("product not available")

    const jewelsAmountResult = userId.jewelsAmount -= productsId.value;
    console.log(jewelsAmountResult);
    await this.userRepository.updateUser(idUser, { jewelsAmount: jewelsAmountResult });

    await this.productRepository.decrementProductsAmount(idProducts, 1);

    const products = await this.userRepository.addProducts(idUser, idProducts);
    return products;
  }

  async softDelete(id: string): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new Error("Invalid Id");
    }
    const idUser = await this.userRepository.getById(id);
    if (!idUser) {
      throw new Error("error: Invalid or does not match any existing user.");
    }
    const deletedUser = await this.userRepository.softDelete(id);
    if (!deletedUser) throw new Error("cant delete team");
    return deletedUser;
  }
}
