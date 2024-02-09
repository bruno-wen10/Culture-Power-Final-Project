import { Router } from "express";
import { productsModule } from "../factory/Products-factory";
import { AuthRoutePrivateMiddleware } from "../../../Middlewares/Auth-login-middleware";
import { VerifyAdmin } from "../../User/Middlewares/Verify-Admin-middleware";
import { uploudPictureProduct } from "../Middlewares/imageProducts-uploud-middleware";

export const productsRouter = Router()

//Listar todos os produtos (Rota Privada)
productsRouter.get('/', /* Rota Privada */
AuthRoutePrivateMiddleware.handle.bind(AuthRoutePrivateMiddleware),
productsModule.getAll.bind(productsModule))

//Buscar produto por ID (Rota Privada)
productsRouter.get('/products/:id', /* Rota Privada */
AuthRoutePrivateMiddleware.handle.bind(AuthRoutePrivateMiddleware),
productsModule.getById.bind(productsModule))

//Cadastro de produto (Rota Privada - ADMIN)
productsRouter.post('/products', /* Rota Privada */
uploudPictureProduct.single('productPicture'),
VerifyAdmin.isAdmin.bind(VerifyAdmin),
productsModule.create.bind(productsModule))


//Edição de produtos (Rota Privada - ADMIN)
productsRouter.put('/products/:id', /* Rota Privada */
VerifyAdmin.isAdmin.bind(VerifyAdmin),
productsModule.update.bind(productsModule))

//Exclusão de produtos (Rota Privada - ADMIN)
productsRouter.delete('/products/:id', /* Rota Privada */
VerifyAdmin.isAdmin.bind(VerifyAdmin),
productsModule.softDelete.bind(productsModule))

