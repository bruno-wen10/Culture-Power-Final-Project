
import { fakeProductRepository } from "../../../Product/__mock__/fake-product-repository";
import { IProductsRepository } from "../../../Product/repository/interface/Products-repository-interface";
import { fakeUserAdmin, fakeUserModel } from "../../__mock__/fake-user-model";
import { fakeUserRepository } from "../../__mock__/fake-user-repository";
import { User } from "../../model/User";
import { UpdateUserDTO } from "../../model/dto/User-dto";
import { UserService } from "../User-service";



const userService = new UserService(fakeUserRepository, fakeProductRepository)

describe("User Service", () => {
    describe("getByEmail", () => {
        it("should return a user by email", async () => {
            const user = await userService.getByEmail(fakeUserAdmin.email)
            expect(user).toEqual(fakeUserAdmin)
        })
        it('Should return an error if user not found', async () => {
            jest.spyOn(fakeUserRepository, 'getByEmail').mockResolvedValueOnce(null)
            await expect(userService.getByEmail('algumacoisa@example.com')).rejects.toThrow("Email not found")
        })
    })
    describe("getById", () => {
        it("should return an user by id", async () => {
            const user = await userService.getById(fakeUserAdmin._id)
            expect(user).toEqual(fakeUserAdmin)            
        })
        it('Should return an error if user not found', async () => {
            jest.spyOn(fakeUserRepository, 'getById').mockResolvedValueOnce(null)
            await expect(userService.getById('65725t4f265acb30ac7g881f')).rejects.toThrow("Invalid id")
        })
    })
    describe("create", () => {
        it("should create a new user", async () => {
            jest.spyOn(fakeUserRepository, 'getByEmail').mockResolvedValueOnce(null)

            jest.spyOn(fakeUserRepository, 'create').mockResolvedValueOnce(fakeUserAdmin as any)

            const user = await userService.create(fakeUserAdmin)

            expect(user).toEqual(fakeUserAdmin);

           
        })
        it('Should return an error if not able to create user', async() => {
            jest.spyOn(fakeUserRepository, 'getByEmail').mockResolvedValueOnce(null)
            jest.spyOn(fakeUserRepository, 'create').mockResolvedValueOnce(null)

            await expect(userService.create(fakeUserAdmin)).rejects.toThrow("User not created")            
        }) 
        it('Should return an error if user already exists', async() => {
            jest.spyOn(fakeUserRepository, 'getByEmail').mockResolvedValueOnce(fakeUserAdmin as any)

            await expect(userService.create(fakeUserAdmin)).rejects.toThrow("User already exist")

        })
    })
    describe('sendJewelryToUser', () => {
        it('should send jewelry to user', async () => {
            // Defina o ID do usuário e as informações da jóia
          const idUser = fakeUserAdmin._id
          const jewel: UpdateUserDTO = {
            'jewelsAmount': 15              
          }
          // Configuração do mock para o método findByIdAndUpdate
          jest.spyOn(fakeUserModel, 'findByIdAndUpdate').mockResolvedValueOnce(fakeUserAdmin)

           // Chama a função sendJewelryToUser do serviço de usuário
          const user = await userService.sendJewelryToUser(idUser, jewel)

        })
    })

  
   
})