"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/Modules/Product/model/Products.ts
var Products_exports = {};
__export(Products_exports, {
  ProductModel: () => ProductModel,
  ProductsSchema: () => ProductsSchema
});
module.exports = __toCommonJS(Products_exports);
var import_mongoose = require("mongoose");
var ProductsSchema = new import_mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  Amount: {
    type: Number,
    default: 0,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  productPicture: {
    type: String,
    default: ""
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});
var ProductModel = (0, import_mongoose.model)("Products", ProductsSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProductModel,
  ProductsSchema
});
