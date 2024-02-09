import { Product } from "../../model/Products";
import { ProductsDTO } from "../../model/dto/Products-DTO";


export interface IProductsRepository{
    getAll(): Promise<Product[]> ,
    getById(id:string): Promise<Product | null>,
    create(product:ProductsDTO):Promise<Product>,
    update(idProduct:string, newProduct:Product):Promise<Product | null>,
    softDelete(id:string): Promise<Product | null>
}