import { IProductsRepository } from "../repository/interface/Products-repository-interface"
import { fakeProductArray } from "./fake-product-model"


export const fakeProductRepository = {
    getAll(){
        return Promise.resolve(fakeProductArray)
    },
    getById(){
        return Promise.resolve(fakeProductArray[0])
    },
    create(){
        return Promise.resolve(fakeProductArray[0])
    },
    decrementProductsAmount(){
        return Promise.resolve(fakeProductArray[0])
    },
    update(){
        return Promise.resolve(fakeProductArray[0])
    },
    softDelete(){
        return Promise.resolve(fakeProductArray[0])
    }
} as unknown as IProductsRepository