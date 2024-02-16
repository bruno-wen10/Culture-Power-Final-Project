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

// src/Modules/User/model/dto/User-dto.ts
var User_dto_exports = {};
__export(User_dto_exports, {
  UpdateUserDTO: () => UpdateUserDTO
});
module.exports = __toCommonJS(User_dto_exports);
var UpdateUserDTO = class {
  constructor(userData) {
    this.name = userData == null ? void 0 : userData.name;
    this.email = userData == null ? void 0 : userData.email;
    this.password = userData == null ? void 0 : userData.password;
    this.role = userData == null ? void 0 : userData.role;
    this.profilePicture = userData == null ? void 0 : userData.profilePicture;
    this.jewelsAmount = userData == null ? void 0 : userData.jewelsAmount;
    this.products = userData == null ? void 0 : userData.products;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UpdateUserDTO
});
