import { ProductsController } from "../controller/Products-controller";
import { ProductModel } from "../model/Products";
import { ProductRepository } from "../repository/Product-repository";
import { ProductService } from "../service/Procuts-service";

class makeProducts {
  static makeProducts() {
    const repository = new ProductRepository(ProductModel);
    const service = new ProductService(repository);
    const controller = new ProductsController(service);

    return controller;
  }
}
export const productsModule = makeProducts.makeProducts()