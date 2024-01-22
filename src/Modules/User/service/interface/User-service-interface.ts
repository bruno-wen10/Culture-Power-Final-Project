import { User } from "../../model/User";
import { UpdateUserDTO, userDTO } from "../../model/dto/User-dto";



export interface IUserServiceInterface {
    getByEmail(email: string): Promise<User  | null> 
    getById (id: string):Promise<User | null>
    create (userData: userDTO):Promise<User | null>
    addProducts(idUser:string, idProducts:string):Promise<User>
    updateUser (id: string, newUser: UpdateUserDTO):Promise<User | null>
    softDelete(id: string): Promise<User>
}