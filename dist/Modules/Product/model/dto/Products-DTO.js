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

// src/Modules/Product/model/dto/Products-DTO.ts
var Products_DTO_exports = {};
__export(Products_DTO_exports, {
  UpdateProductsDTO: () => UpdateProductsDTO
});
module.exports = __toCommonJS(Products_DTO_exports);
var UpdateProductsDTO = class {
  constructor(pructData) {
    this.adminId = pructData == null ? void 0 : pructData.adminId;
    this.name = pructData == null ? void 0 : pructData.name;
    this.value = pructData == null ? void 0 : pructData.value;
    this.Amount = pructData == null ? void 0 : pructData.Amount;
    this.description = pructData == null ? void 0 : pructData.description;
    this.productPicture = pructData == null ? void 0 : pructData.productPicture;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UpdateProductsDTO
});
