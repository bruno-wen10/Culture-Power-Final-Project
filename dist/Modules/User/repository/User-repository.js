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

// src/Modules/User/repository/User-repository.ts
var User_repository_exports = {};
__export(User_repository_exports, {
  UserRepository: () => UserRepository
});
module.exports = __toCommonJS(User_repository_exports);
var UserRepository = class {
  constructor(userModel) {
    this.userModel = userModel;
  }
  getByEmail(email) {
    return __async(this, null, function* () {
      const userEmail = yield this.userModel.findOne({
        email,
        deletedAt: null
      });
      return userEmail;
    });
  }
  getById(id) {
    return __async(this, null, function* () {
      const userId = yield this.userModel.findOne({ _id: id, deletedAt: null });
      return userId;
    });
  }
  create(userData) {
    return __async(this, null, function* () {
      const newUser = yield this.userModel.create(userData);
      return newUser;
    });
  }
  updateUserRoleToAdmin(idUser, newAdmin) {
    return __async(this, null, function* () {
      const Admin = yield this.userModel.findByIdAndUpdate(idUser, newAdmin, { new: true });
      return Admin;
    });
  }
  sendJewelryToUser(idUser, jewel) {
    return __async(this, null, function* () {
      console.log("Chegou no Repository", jewel);
      const user = yield this.userModel.findByIdAndUpdate(idUser, jewel, { new: true });
      if (!user)
        throw new Error("Jewelry could not be added");
      return user;
    });
  }
  updateUser(id, newUser) {
    return __async(this, null, function* () {
      console.log("Chegou no Repository" + newUser);
      const updateUser = yield this.userModel.findByIdAndUpdate(id, newUser, {
        new: true
      });
      if (!updateUser) {
        throw new Error("error: cant update User");
      }
      return updateUser;
    });
  }
  addProducts(idUser, idProducts) {
    return __async(this, null, function* () {
      const products = yield this.userModel.findByIdAndUpdate(idUser, { $push: { products: idProducts } }, { new: true });
      if (!products) {
        throw new Error("Product could not be added");
      }
      return products;
    });
  }
  softDelete(id) {
    return __async(this, null, function* () {
      const deletedUser = yield this.userModel.findByIdAndUpdate(
        id,
        { deletedAt: /* @__PURE__ */ new Date() },
        { new: true }
      );
      if (!deletedUser) {
        throw new Error("cant delete User");
      }
      return deletedUser;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserRepository
});
