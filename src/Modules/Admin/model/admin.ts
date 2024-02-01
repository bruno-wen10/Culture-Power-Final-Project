import { InferSchemaType, Model, Schema, model } from "mongoose";


const adminSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true

    }
})

export type Admin = InferSchemaType<typeof adminSchema>

export const Admin: Model<Admin> = model('Admin', adminSchema)