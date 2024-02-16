import { IUserRepositoryInterface } from "../repository/interface/User-repository-interface"
import { fakeUserAdmin } from "./fake-user-model"


export const fakeUserRepository = {
    getByEmail() {
        return Promise.resolve(fakeUserAdmin)
    },
    getById(){
        return Promise.resolve(fakeUserAdmin)
    },
    create(){
        return Promise.resolve(fakeUserAdmin)
    },
    updateUserRoleToAdmin(){
        return Promise.resolve(fakeUserAdmin)
    },
    sendJewelryToUser(){
        return Promise.resolve(fakeUserAdmin)
    },
    updateUser(){
        return Promise.resolve(fakeUserAdmin)
    },
    addProducts(){
        return Promise.resolve(fakeUserAdmin)
    },
    softDelete(){
        return Promise.resolve(fakeUserAdmin)
    }
} as unknown as IUserRepositoryInterface