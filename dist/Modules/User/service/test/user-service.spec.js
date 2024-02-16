"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/Modules/User/__mock__/fake-user-model.ts
var fakeUserModel = {
  find: jest.fn().mockImplementation(() => fakeUserArray),
  findOne: jest.fn().mockImplementation(() => fakeUserAdmin),
  findById: jest.fn().mockImplementation(() => fakeUserAdmin),
  create: jest.fn().mockImplementation(() => fakeUserAdmin),
  findByIdAndUpdate: jest.fn().mockImplementation(() => fakeUserAdmin)
};
var fakeUserArray = [
  {
    _id: "65725f4f264acb30ac7a881f",
    name: "Lucas",
    email: "lucas@arnia.com",
    password: "admin",
    role: "client",
    profilePicture: "",
    jewelsAmount: 0,
    products: [],
    deletedAt: null,
    createdAt: /* @__PURE__ */ new Date(),
    // Adicione isto
    updatedAt: /* @__PURE__ */ new Date()
    // Adicione isto
  },
  {
    _id: "65725f4f264acb30ac7a8820",
    name: "Victor",
    email: "victor@arnia.com",
    password: "admin2",
    role: "client",
    profilePicture: "",
    jewelsAmount: 0,
    products: [],
    deletedAt: null
  },
  {
    _id: "65725f4f264acb30ac7a8821",
    name: "Alberto",
    email: "alberto@arnia.com",
    password: "admin3",
    role: "client",
    profilePicture: "",
    jewelsAmount: 0,
    products: [],
    deletedAt: null
  }
];
var fakeUserAdmin = fakeUserArray[0];
var fakeUserVictor = fakeUserArray[1];
var fakeUserAlberto = fakeUserArray[2];

// src/Modules/User/__mock__/fake-user-repository.ts
var fakeUserRepository = {
  getByEmail() {
    return Promise.resolve(fakeUserAdmin);
  },
  getById() {
    return Promise.resolve(fakeUserAdmin);
  },
  create() {
    return Promise.resolve(fakeUserAdmin);
  },
  updateUserRoleToAdmin() {
    return Promise.resolve(fakeUserAdmin);
  },
  sendJewelryToUser() {
    return Promise.resolve(fakeUserAdmin);
  },
  updateUser() {
    return Promise.resolve(fakeUserAdmin);
  },
  addProducts() {
    return Promise.resolve(fakeUserAdmin);
  },
  softDelete() {
    return Promise.resolve(fakeUserAdmin);
  }
};

// src/Modules/User/service/User-service.ts
var import_mongoose = require("mongoose");
var import_bcrypt = __toESM(require("bcrypt"));
var UserService = class {
  constructor(userRepository, productRepository) {
    this.userRepository = userRepository;
    this.productRepository = productRepository;
  }
  getByEmail(email) {
    return __async(this, null, function* () {
      console.log(`Buscando usu\xE1rio por e-mail: ${email}`);
      const userEmail = yield this.userRepository.getByEmail(email);
      if (!userEmail)
        throw new Error("Email not found");
      return userEmail;
    });
  }
  getById(id) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose.isValidObjectId)(id))
        throw new Error("Invalid id");
      const userId = yield this.userRepository.getById(id);
      if (!userId)
        throw new Error("User not found");
      return userId;
    });
  }
  create(userData) {
    return __async(this, null, function* () {
      const { email } = userData;
      const userAlreadyExist = yield this.userRepository.getByEmail(
        email
      );
      if (userAlreadyExist)
        throw new Error("User already exist");
      userData.password = yield import_bcrypt.default.hash(userData.password, 10);
      const newUser = yield this.userRepository.create(userData);
      if (!newUser) {
        throw new Error("User not created");
      }
      return newUser;
    });
  }
  updateUserRoleToAdmin(userId, newAdmin) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose.isValidObjectId)(userId))
        throw new Error("Invalid id");
      const adminId = yield this.userRepository.getById(userId);
      if (!adminId)
        throw new Error("error: invalid id");
      const admin = yield this.userRepository.updateUserRoleToAdmin(
        userId,
        newAdmin
      );
      return admin;
    });
  }
  sendJewelryToUser(idUser, jewel) {
    return __async(this, null, function* () {
      const userId = yield this.userRepository.getById(idUser);
      if (!userId)
        throw new Error("error: invalid id");
      console.log(jewel);
      const user = yield this.userRepository.sendJewelryToUser(idUser, jewel);
      return user;
    });
  }
  updateUser(id, newUser) {
    return __async(this, null, function* () {
      console.log("chegou no Servi\xE7o");
      if (!(0, import_mongoose.isValidObjectId)(id))
        throw new Error("Invalid id");
      const user = yield this.userRepository.getById(id);
      if (!user)
        throw new Error("error: invalid id");
      newUser.password = yield import_bcrypt.default.hash(newUser.password, 10);
      const updatedUser = yield this.userRepository.updateUser(id, newUser);
      if (!updatedUser) {
        throw new Error("error: cant update User");
      }
      return updatedUser;
    });
  }
  addProducts(idUser, idProducts) {
    return __async(this, null, function* () {
      console.log("chegou no Servi\xE7o", idUser, idProducts);
      const userId = yield this.userRepository.getById(idUser);
      const productsId = yield this.productRepository.getById(idProducts);
      if (!userId || !productsId)
        throw new Error("User or product not found");
      if (typeof userId.jewelsAmount !== "number" || typeof productsId.value !== "number")
        throw new Error("invalid data type");
      if (userId.jewelsAmount < productsId.value) {
        throw new Error("User does not have enough jewelry to redeem product");
      }
      if (productsId.Amount < 1)
        throw new Error("product not available");
      const jewelsAmountResult = userId.jewelsAmount -= productsId.value;
      console.log(jewelsAmountResult);
      yield this.userRepository.updateUser(idUser, { jewelsAmount: jewelsAmountResult });
      yield this.productRepository.decrementProductsAmount(idProducts, 1);
      const products = yield this.userRepository.addProducts(idUser, idProducts);
      return products;
    });
  }
  softDelete(id) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose.isValidObjectId)(id)) {
        throw new Error("Invalid Id");
      }
      const idUser = yield this.userRepository.getById(id);
      if (!idUser) {
        throw new Error("error: Invalid or does not match any existing user.");
      }
      const deletedUser = yield this.userRepository.softDelete(id);
      if (!deletedUser)
        throw new Error("cant delete team");
      return deletedUser;
    });
  }
};

// src/Modules/User/service/test/user-service.spec.ts
var userService = new UserService(fakeUserRepository, fakeProductRepository);
describe("User Service", () => {
  describe("getByEmail", () => {
    it("should return a user by email", () => __async(exports, null, function* () {
      const user = yield userService.getByEmail(fakeUserAdmin.email);
      expect(user).toEqual(fakeUserAdmin);
    }));
    it("Should return an error if user not found", () => __async(exports, null, function* () {
      jest.spyOn(fakeUserRepository, "getByEmail").mockResolvedValueOnce(null);
      yield expect(userService.getByEmail("algumacoisa@example.com")).rejects.toThrow("Email not found");
    }));
  });
  describe("getById", () => {
    it("should return an user by id", () => __async(exports, null, function* () {
      const user = yield userService.getById(fakeUserAdmin._id);
      expect(user).toEqual(fakeUserAdmin);
    }));
    it("Should return an error if user not found", () => __async(exports, null, function* () {
      jest.spyOn(fakeUserRepository, "getById").mockResolvedValueOnce(null);
      yield expect(userService.getById("65725t4f265acb30ac7g881f")).rejects.toThrow("Invalid id");
    }));
  });
  describe("create", () => {
    it("should create a new user", () => __async(exports, null, function* () {
      jest.spyOn(fakeUserRepository, "getByEmail").mockResolvedValueOnce(null);
      jest.spyOn(fakeUserRepository, "create").mockResolvedValueOnce(fakeUserAdmin);
      const user = yield userService.create(fakeUserAdmin);
      expect(user).toEqual(fakeUserAdmin);
    }));
    it("Should return an error if not able to create user", () => __async(exports, null, function* () {
      jest.spyOn(fakeUserRepository, "getByEmail").mockResolvedValueOnce(null);
      jest.spyOn(fakeUserRepository, "create").mockResolvedValueOnce(null);
      yield expect(userService.create(fakeUserAdmin)).rejects.toThrow("User not created");
    }));
    it("Should return an error if user already exists", () => __async(exports, null, function* () {
      jest.spyOn(fakeUserRepository, "getByEmail").mockResolvedValueOnce(fakeUserAdmin);
      yield expect(userService.create(fakeUserAdmin)).rejects.toThrow("User already exist");
    }));
  });
  describe("sendJewelryToUser", () => {
    it("should send jewelry to user", () => __async(exports, null, function* () {
      const idUser = fakeUserAdmin._id;
      const jewel = {
        "jewelsAmount": 15
      };
      jest.spyOn(fakeUserModel, "findByIdAndUpdate").mockResolvedValueOnce(fakeUserAdmin);
      const user = yield userService.sendJewelryToUser(idUser, jewel);
      expect(fakeUserModel.findByIdAndUpdate).toHaveBeenCalledWith(idUser, jewel, { new: true });
      expect(user).toEqual(fakeUserAdmin);
    }));
  });
});
