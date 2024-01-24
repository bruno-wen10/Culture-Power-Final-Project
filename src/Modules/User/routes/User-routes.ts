import { Router } from "express";
import { userModule } from "../Factory/User-factory";


export const  userRoutes = Router() 

userRoutes.get('/user/:findEmail', /* Rota Privada */ userModule.getByEmail.bind(userModule))

userRoutes.get('/user/:id', /*RotaPrivada */ userModule.getById.bind(userModule))

userRoutes.post('/user', /* Rota Publica*/ userModule.create.bind(userModule))

userRoutes.put('/addProducts', /* Rota Privada */ userModule.addProducts.bind(userModule))

userRoutes.put('/user/:id', /* Rota Privada*/ userModule.updateUser.bind(userModule))

userRoutes.delete('/user/:id', /* Rota Privada */ userModule.softDelete.bind(userModule))