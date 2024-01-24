
import { UserModel } from "../../User/model/User"
import { UserRepository } from "../../User/repository/User-repository"
import { AuthController } from "../controller/Auth-login-controller"
import { AuthService } from "../service/Auth-service"


export const makeAuthLogin = ()=>{

    const repository = new UserRepository(UserModel)
    const service = new AuthService(repository)
    const controller = new AuthController(service)

    return controller
}

export const AuthLogin = makeAuthLogin()