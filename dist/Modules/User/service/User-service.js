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

// src/Modules/User/service/User-service.ts
var User_service_exports = {};
__export(User_service_exports, {
  UserService: () => UserService
});
module.exports = __toCommonJS(User_service_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserService
});
