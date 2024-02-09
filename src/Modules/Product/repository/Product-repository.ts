import { Model } from "mongoose";
import { Product } from "../model/Products";
import { IProductsRepository } from "./interface/Products-repository-interface";
import { ProductsDTO } from "../model/dto/Products-DTO";

export class ProductRepository implements IProductsRepository {
  constructor(private productModel: Model<Product>) {}

  async getAll(): Promise<Product[]> {
    const products = await this.productModel.find({ Amount: { $gt: 0 } });
    return products;
  }
  async getById(id: string): Promise<Product | null> {
    const product = await this.productModel.findById(id);
    return product;
  }
  async create(product: ProductsDTO): Promise<Product> {
    const createdProduct = await this.productModel.create(product);
    return createdProduct;
  }
  async update(
    idProduct: string,
    newProduct: Product
  ): Promise<Product | null> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      idProduct,
      newProduct
    );
    return updatedProduct;
  }
  async softDelete(id: string): Promise<Product | null> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    return deletedProduct;
  }
}
