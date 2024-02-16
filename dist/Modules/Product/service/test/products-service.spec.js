"use strict";
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

// src/Modules/Product/service/Procuts-service.ts
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

// src/Modules/Product/service/test/products-service.spec.ts
var productsService = new ProductService(fakeProductRepository);
describe("Product Service", () => {
  describe("Get All Products", () => {
    it("should return all products", () => __async(exports, null, function* () {
      const products = yield productsService.getAll();
      expect(products).toEqual(fakeProductArray);
    }));
  });
});
