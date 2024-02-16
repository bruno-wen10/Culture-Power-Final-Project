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

// src/Modules/Product/Middlewares/imageProducts-uploud-middleware.ts
var imageProducts_uploud_middleware_exports = {};
__export(imageProducts_uploud_middleware_exports, {
  configPictureProduct: () => configPictureProduct,
  uploudPictureProduct: () => uploudPictureProduct
});
module.exports = __toCommonJS(imageProducts_uploud_middleware_exports);
var import_multer = __toESM(require("multer"));
var import_path = __toESM(require("path"));
var configPictureProduct = (0, import_multer.diskStorage)({
  destination: function(req, file, cb) {
    cb(null, "./Uplouds-image-products");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + import_path.default.extname(file.originalname));
  }
});
var uploudPictureProduct = (0, import_multer.default)({ storage: configPictureProduct });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  configPictureProduct,
  uploudPictureProduct
});