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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/Modules/Product/repository/Product-repository.ts
var Product_repository_exports = {};
__export(Product_repository_exports, {
  ProductRepository: () => ProductRepository
});
module.exports = __toCommonJS(Product_repository_exports);
var ProductRepository = class {
  constructor(productModel) {
    this.productModel = productModel;
  }
  getAll() {
    return __async(this, null, function* () {
      const products = yield this.productModel.find({ Amount: { $gt: 0 } });
      return products;
    });
  }
  getById(id) {
    return __async(this, null, function* () {
      const product = yield this.productModel.findById(id);
      return product;
    });
  }
  create(product) {
    return __async(this, null, function* () {
      const createdProduct = yield this.productModel.create(product);
      return createdProduct;
    });
  }
  decrementProductsAmount(idProduct, amount) {
    return __async(this, null, function* () {
      const product = yield this.productModel.findByIdAndUpdate(idProduct, { $inc: { Amount: -amount } }, { new: true });
      return product;
    });
  }
  update(idProduct, newProduct) {
    return __async(this, null, function* () {
      const updatedProduct = yield this.productModel.findByIdAndUpdate(
        idProduct,
        newProduct
      );
      return updatedProduct;
    });
  }
  softDelete(id) {
    return __async(this, null, function* () {
      const deletedProduct = yield this.productModel.findByIdAndDelete(id);
      return deletedProduct;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProductRepository
});
