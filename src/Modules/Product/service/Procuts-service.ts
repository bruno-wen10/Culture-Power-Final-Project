import { isValidObjectId } from "mongoose";
import { IProductsRepository } from "../repository/interface/Products-repository-interface";
import { IProductsService } from "./interface/Products-service-interface";
import { Product } from "../model/Products";
import { ProductsDTO } from "../model/dto/Products-DTO";




export class ProductService implements IProductsService{
    constructor(
        private productRepository: IProductsRepository,
    ){}

    async getAll():Promise<Product[]>{
        return await this.productRepository.getAll()
    }
    async getById(id:string):Promise<Product | null>{
        if(!isValidObjectId(id)) throw new Error("Invalid id")
        const productId = await this.productRepository.getById(id)
        if(!productId) throw new Error("Products not found")
        return productId
    }
    async create(product: ProductsDTO):Promise<Product | null>{
        
        const productCreated = await this.productRepository.create(product)
        return productCreated
    }
    async update(idProduct:string, newProduct:Product):Promise<Product | null>{
        if(!isValidObjectId(idProduct)) throw new Error("Invalid id")
        const productUpdated = await this.productRepository.update(idProduct, newProduct)
        if(!productUpdated) throw new Error("error: cant update product")
        return productUpdated    
    }
    async softDelete(id:string):Promise<Product | null>{
        if(!isValidObjectId(id)) throw new Error("Invalid id")
        const idProduct = await this.productRepository.getById(id)
        if(!idProduct) throw new Error("Error: Invalid or does not match any existing product")
        const productDeleted = await this.productRepository.softDelete(id)
        if(!productDeleted) throw new Error("error: cant delete product") 
        return productDeleted
    }

}