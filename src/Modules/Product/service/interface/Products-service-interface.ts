import { Product } from "../../model/Products";
import { ProductsDTO } from "../../model/dto/Products-DTO";



export interface IProductsService {
    getAll(): Promise<Product[]> ,
    getById(id:string): Promise<Product | null>,
    create(products: ProductsDTO):Promise<Product | null>,
    update(idProduct:string, newProduct:Product):Promise<Product | null>,   
    softDelete(id:string): Promise<Product | null>
}