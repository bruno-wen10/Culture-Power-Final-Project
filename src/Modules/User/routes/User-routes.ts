import { Router } from "express";
import { userModule } from "../Factory/User-factory";
import { uploudPictureProfile } from "../Middlewares/pictureProfile-uploud-middleware";
import { AuthRoutePrivateMiddleware } from "../../../Middlewares/Auth-login-middleware";
import { VerifyAdmin } from "../Middlewares/Verify-Admin-middleware";




export const  userRoutes = Router() 

//Listar Usuários Por Email
userRoutes.get('/userEmail', userModule.getByEmail.bind(userModule))

//Listar Usuário Por ID (Rota Privada)
userRoutes.get('/user/:id', /*RotaPrivada */ AuthRoutePrivateMiddleware.handle.bind(AuthRoutePrivateMiddleware), userModule.getById.bind(userModule))

//Cadastrar Usuário (Rota Publica)
userRoutes.post('/user', /* Rota Publica*/ uploudPictureProfile.single('profilePicture'), userModule.create.bind(userModule))

//Resgatar Produto (ROTA PRIVADA)
userRoutes.put('/user/addProducts', /* Rota Privada */ 
//AuthRoutePrivateMiddleware.handle.bind(AuthRoutePrivateMiddleware), 
userModule.addProducts.bind(userModule))

//Enviar Joia para Usuário (ROTA PRIVADA - ADMIN)
userRoutes.put('/user/:id/send-jewel', /* Rota Privada*/
VerifyAdmin.isAdmin,
userModule.sendJewelryToUser.bind(userModule))

//Edição de Usuário P/ ADMIN (ROTA PRIVADA - ADMIN)
userRoutes.put('/user/:id/updateRoleToAdmin', /* Rota Privada*/
VerifyAdmin.isAdmin,
 userModule.updateUserRoleToAdmin.bind(userModule))

//Edição de Usuário (ROTA PRIVADA)
userRoutes.put('/user/:id', /* Rota Privada*/  
AuthRoutePrivateMiddleware.handle.bind(AuthRoutePrivateMiddleware),  
userModule.updateUser.bind(userModule))

//Exclusão de Usuário (ROTA PRIVADA)
userRoutes.delete('/user/:id', /* Rota Privada */ 
AuthRoutePrivateMiddleware.handle.bind(AuthRoutePrivateMiddleware), 
userModule.softDelete.bind(userModule))