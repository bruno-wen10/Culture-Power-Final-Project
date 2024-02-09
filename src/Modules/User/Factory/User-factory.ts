import { ProductModel } from "../../Product/model/Products";
import { ProductRepository } from "../../Product/repository/Product-repository";
import { UserController } from "../controller/UserController";
import { UserModel } from "../model/User";
import { UserRepository } from "../repository/User-repository";
import { UserService } from "../service/User-service";

export function makeUser(){
const productsRepository = new ProductRepository(ProductModel)    
const repository = new UserRepository(UserModel)
const service = new UserService(repository, productsRepository)
const controller = new UserController(service)

return controller

}

export const  userModule = makeUser()