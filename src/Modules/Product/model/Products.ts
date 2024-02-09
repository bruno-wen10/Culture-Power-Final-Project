import { InferSchemaType, Schema, Types, model } from "mongoose";

export const ProductsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  Amount: {
    type: Number,
    default: 0,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  productPicture: {
    type: String,
    default: "",
    
  },
  deletedAt: {
    type: Date,
    default: null,
  }

}, {
  timestamps: true
});

export type Product = InferSchemaType<typeof ProductsSchema>

export const ProductModel = model('Products', ProductsSchema)
