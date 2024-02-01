import { Model } from "mongoose";
import { Product } from "../model/Products";



export class ProductRepository {
    constructor(private productModel:Model<Product>){}

    async getAll():Promise<Product[]>{
        const products = await this.productModel.find({Amount:{$gt:0}})
        return products
    }
    async getById(id:string):Promise<Product>{
        const product = await this.productModel.findById(id)
        return product
    }
}
