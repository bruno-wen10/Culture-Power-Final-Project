import { fakeProductArray } from "../../__mock__/fake-product-model"
import { fakeProductRepository } from "../../__mock__/fake-product-repository"
import { ProductService } from "../Procuts-service"


const productsService = new ProductService(fakeProductRepository)

describe("Product Service", () => {
    describe("Get All Products", () => {
        it("should return all products", async () => {
            const products = await productsService.getAll()
            expect(products).toEqual(fakeProductArray)
        })
    })
})