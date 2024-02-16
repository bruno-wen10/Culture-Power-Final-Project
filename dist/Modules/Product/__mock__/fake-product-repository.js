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

// src/Modules/Product/__mock__/fake-product-repository.ts
var fake_product_repository_exports = {};
__export(fake_product_repository_exports, {
  fakeProductRepository: () => fakeProductRepository
});
module.exports = __toCommonJS(fake_product_repository_exports);

// src/Modules/Product/__mock__/fake-product-model.ts
var fakeProductModel = {
  find: jest.fn().mockImplementation(() => fakeProductArray),
  findOne: jest.fn().mockImplementation(() => fakeProduct),
  findById: jest.fn().mockImplementation(() => fakeProduct),
  create: jest.fn().mockImplementation(() => fakeProduct),
  findByIdAndUpdate: jest.fn().mockImplementation(() => fakeProduct),
  findByIdAndDelete: jest.fn().mockImplementation(() => fakeProduct)
};
var fakeProductArray = [
  {
    _id: "65725f4f264acb30ac7a881f",
    name: "Product 1",
    value: 100,
    Amount: 10,
    description: "Description 1",
    productPicture: "",
    deletedAt: null
  },
  {
    _id: "65725f4f264acb30ac7a8820",
    name: "Product 2",
    value: 200,
    Amount: 20,
    description: "Description 2",
    productPicture: "",
    deletedAt: null
  },
  {
    _id: "65725f4f264acb30ac7a8821",
    name: "Product 3",
    value: 300,
    Amount: 30,
    description: "Description 3",
    productPicture: "",
    deletedAt: null
  }
];
var fakeProduct = {
  _id: "65725f4f264acb30ac7a881f",
  name: "Product 1",
  value: 100,
  Amount: 10,
  description: "Description 1",
  productPicture: "",
  deletedAt: null
};

// src/Modules/Product/__mock__/fake-product-repository.ts
var fakeProductRepository = {
  getAll() {
    return Promise.resolve(fakeProductArray);
  },
  getById() {
    return Promise.resolve(fakeProductArray[0]);
  },
  create() {
    return Promise.resolve(fakeProductArray[0]);
  },
  decrementProductsAmount() {
    return Promise.resolve(fakeProductArray[0]);
  },
  update() {
    return Promise.resolve(fakeProductArray[0]);
  },
  softDelete() {
    return Promise.resolve(fakeProductArray[0]);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fakeProductRepository
});
