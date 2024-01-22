import { InferSchemaType, Model, Schema, Types, model } from "mongoose";



const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },   
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
        minLength: 6
    },
    profilePicture: {
        type: String,
        default: ''        
    },
    products:[{
        type: Types.ObjectId,
        ref: 'Product'
    }],
    deletedAt: {
        type: Date,
        default: null
    },
   


},  {timestamps:true})

export type User = InferSchemaType<typeof userSchema>

export const UserModel: Model<User> = model('User', userSchema)