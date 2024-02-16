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

// src/Modules/Product/service/Procuts-service.ts
var Procuts_service_exports = {};
__export(Procuts_service_exports, {
  ProductService: () => ProductService
});
module.exports = __toCommonJS(Procuts_service_exports);
var import_mongoose = require("mongoose");
var ProductService = class {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  getAll() {
    return __async(this, null, function* () {
      return yield this.productRepository.getAll();
    });
  }
  getById(id) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose.isValidObjectId)(id))
        throw new Error("Invalid id");
      const productId = yield this.productRepository.getById(id);
      if (!productId)
        throw new Error("Products not found");
      return productId;
    });
  }
  create(product) {
    return __async(this, null, function* () {
      const productCreated = yield this.productRepository.create(product);
      return productCreated;
    });
  }
  update(idProduct, newProduct) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose.isValidObjectId)(idProduct))
        throw new Error("Invalid id");
      const productUpdated = yield this.productRepository.update(idProduct, newProduct);
      if (!productUpdated)
        throw new Error("error: cant update product");
      return productUpdated;
    });
  }
  softDelete(id) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose.isValidObjectId)(id))
        throw new Error("Invalid id");
      const idProduct = yield this.productRepository.getById(id);
      if (!idProduct)
        throw new Error("Error: Invalid or does not match any existing product");
      const productDeleted = yield this.productRepository.softDelete(id);
      if (!productDeleted)
        throw new Error("error: cant delete product");
      return productDeleted;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProductService
});
