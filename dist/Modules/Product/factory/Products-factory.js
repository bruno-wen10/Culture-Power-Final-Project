"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/Modules/Product/factory/Products-factory.ts
var Products_factory_exports = {};
__export(Products_factory_exports, {
  productsModule: () => productsModule
});
module.exports = __toCommonJS(Products_factory_exports);

// src/Modules/Product/utils/Products-Create-validator.ts
var yup = __toESM(require("yup"));
var productsCreateValidatorYup = yup.object({
  name: yup.string().required("Name is required"),
  value: yup.number().required("Value is required"),
  Amount: yup.number().required("Amount is required"),
  description: yup.string().required("Description is required"),
  productPicture: yup.string()
  //.required('Image is required')
});

// src/Modules/Product/controller/Products-controller.ts
var ProductsController = class {
  constructor(service) {
    this.service = service;
  }
  getAll(req, res) {
    return __async(this, null, function* () {
      console.log("rodou!");
      try {
        const result = yield this.service.getAll();
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  }
  getById(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const result = yield this.service.getById(id);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  }
  create(req, res) {
    return __async(this, null, function* () {
      try {
        const { body } = req;
        console.log(body);
        yield productsCreateValidatorYup.validate(body, { abortEarly: false });
        const result = yield this.service.create(body);
        res.status(201).json(result);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
    });
  }
  update(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const { body } = req;
        console.log("chegou no Controler", req.body);
        const result = yield this.service.update(id, body);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  }
  softDelete(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const result = yield this.service.softDelete(id);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  }
};

// src/Modules/Product/model/Products.ts
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

// src/Modules/Product/repository/Product-repository.ts
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

// src/Modules/Product/service/Procuts-service.ts
var import_mongoose2 = require("mongoose");
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
      if (!(0, import_mongoose2.isValidObjectId)(id))
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
      if (!(0, import_mongoose2.isValidObjectId)(idProduct))
        throw new Error("Invalid id");
      const productUpdated = yield this.productRepository.update(idProduct, newProduct);
      if (!productUpdated)
        throw new Error("error: cant update product");
      return productUpdated;
    });
  }
  softDelete(id) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose2.isValidObjectId)(id))
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

// src/Modules/Product/factory/Products-factory.ts
var makeProducts = class {
  static makeProducts() {
    const repository = new ProductRepository(ProductModel);
    const service = new ProductService(repository);
    const controller = new ProductsController(service);
    return controller;
  }
};
var productsModule = makeProducts.makeProducts();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  productsModule
});
