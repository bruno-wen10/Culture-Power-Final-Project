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

// src/Modules/User/__mock__/fake-user-repository.ts
var fake_user_repository_exports = {};
__export(fake_user_repository_exports, {
  fakeUserRepository: () => fakeUserRepository
});
module.exports = __toCommonJS(fake_user_repository_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fakeUserRepository
});
