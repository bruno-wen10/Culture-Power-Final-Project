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

// src/Modules/User/__mock__/fake-user-model.ts
var fake_user_model_exports = {};
__export(fake_user_model_exports, {
  fakeUserAdmin: () => fakeUserAdmin,
  fakeUserAlberto: () => fakeUserAlberto,
  fakeUserArray: () => fakeUserArray,
  fakeUserModel: () => fakeUserModel,
  fakeUserVictor: () => fakeUserVictor
});
module.exports = __toCommonJS(fake_user_model_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fakeUserAdmin,
  fakeUserAlberto,
  fakeUserArray,
  fakeUserModel,
  fakeUserVictor
});
