import { Router } from "express";
import { AuthLogin } from "../fatory/Auth-login-factory";
import { AuthRoutePrivateMiddleware } from "../../../Middlewares/Auth-login-middleware";
//import { AuthMiddleware } from "../../../Middlewares/Auth-login-middleware";


export const userRouterAuthLogin = Router()

userRouterAuthLogin.post('/login', AuthLogin.login.bind(AuthLogin))


//Visualizar Usuário Logado (ROTA PRIVADA)
    //Retornar os dados do usuário logado
userRouterAuthLogin.get('/me', /* Rota Privada ADMIN */ AuthRoutePrivateMiddleware.handle.bind(AuthRoutePrivateMiddleware) ,AuthLogin.getByUserLogged.bind(AuthLogin))