import { Model } from "mongoose"
import { User } from "../model/User"

export const fakeUserModel = {
    find: jest.fn().mockImplementation(()=> fakeUserArray ),
    findOne: jest.fn().mockImplementation(()=> fakeUserAdmin ),
    findById: jest.fn().mockImplementation(()=> fakeUserAdmin ),
    create: jest.fn().mockImplementation(()=> fakeUserAdmin ),
    findByIdAndUpdate: jest.fn().mockImplementation(()=> fakeUserAdmin ),
} as unknown as Model<User>

export const fakeUserArray = [
        {
          _id: '65725f4f264acb30ac7a881f',
          name: 'Lucas',
          email: 'lucas@arnia.com',
          password: 'admin',
          role: 'client',
          profilePicture: '',
          jewelsAmount: 0,
          products: [],
          deletedAt: null,
          createdAt: new Date(), // Adicione isto
          updatedAt: new Date(), // Adicione isto
        },
        {
          _id: '65725f4f264acb30ac7a8820',
          name: 'Victor',
          email: 'victor@arnia.com',
          password: 'admin2',
          role: 'client',
          profilePicture: '',
          jewelsAmount: 0,
          products: [],
          deletedAt: null
        },
        {
          _id: '65725f4f264acb30ac7a8821',
          name: 'Alberto',
          email: 'alberto@arnia.com',
          password: 'admin3',
          role: 'client',
          profilePicture: '',
          jewelsAmount: 0,
          products: [],
          deletedAt: null
        }
];

export const fakeUserAdmin = fakeUserArray[0]
export const fakeUserVictor = fakeUserArray[1]
export const fakeUserAlberto = fakeUserArray[2]
      