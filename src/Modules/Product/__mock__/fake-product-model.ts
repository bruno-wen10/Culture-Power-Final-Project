import { Model } from "mongoose"
import { Product } from "../model/Products"


export const fakeProductModel = {
    find: jest.fn().mockImplementation(()=> fakeProductArray ),
    findOne: jest.fn().mockImplementation(()=> fakeProduct ),
    findById: jest.fn().mockImplementation(()=> fakeProduct ),
    create: jest.fn().mockImplementation(()=> fakeProduct ),
    findByIdAndUpdate: jest.fn().mockImplementation(()=> fakeProduct ),
    findByIdAndDelete: jest.fn().mockImplementation(()=> fakeProduct ),
}

export const fakeProductArray = [
    {
        _id: '65725f4f264acb30ac7a881f',
        name: 'Product 1',
        value: 100,
        Amount: 10,
        description: 'Description 1',
        productPicture: '',
        deletedAt: null
    },
    {
        _id: '65725f4f264acb30ac7a8820',
        name: 'Product 2',
        value: 200,
        Amount: 20,
        description: 'Description 2',
        productPicture: '',
        deletedAt: null
    },
    {
        _id: '65725f4f264acb30ac7a8821',    
        name: 'Product 3',
        value: 300,
        Amount: 30,
        description: 'Description 3',
        productPicture: '',
        deletedAt: null

    }
]

export const fakeProduct = {
    _id: '65725f4f264acb30ac7a881f',
    name: 'Product 1',
    value: 100,
    Amount: 10,
    description: 'Description 1',
    productPicture: '',
    deletedAt: null
}