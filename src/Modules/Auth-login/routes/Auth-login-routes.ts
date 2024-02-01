import { Router } from "express";
import { AuthLogin } from "../fatory/Auth-login-factory";
//import { AuthMiddleware } from "../../../Middlewares/Auth-login-middleware";


export const userRouterAuthLogin = Router()

userRouterAuthLogin.post('/login', AuthLogin.login.bind(AuthLogin))