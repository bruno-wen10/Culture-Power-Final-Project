import { User } from "../../model/User";
import { UpdateUserDTO } from "../../model/dto/User-dto";



export interface IUserRepositoryInterface {
    getByEmail(email: string): Promise<User  | null> 
    getById (id: string):Promise<User | null>
    create (userData: User):Promise<User | null>
    updateUser (id: string, newUser: UpdateUserDTO):Promise<User | null>
}