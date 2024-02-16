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

// src/database/Mongo-config.ts
var Mongo_config_exports = {};
__export(Mongo_config_exports, {
  MongooseConfig: () => MongooseConfig
});
module.exports = __toCommonJS(Mongo_config_exports);
var import_mongoose = require("mongoose");
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var MongooseConfig = class {
  static InicializeConnection() {
    try {
      import_mongoose.connection.on(
        "error",
        (err) => console.log("Failed to connect to MongoDB. Error:", err)
      ).on("open", () => {
        console.log("Connected to MongoDB.");
      }).on("close", () => {
        console.log(`Disconnected from MongoDB. Connection closed.`);
      });
      (0, import_mongoose.connect)(process.env.MONGO_URL);
    } catch (error) {
      console.log("Connection fail. Error:", error);
      throw new Error(error);
    }
  }
  static finish() {
    import_mongoose.connection.close();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MongooseConfig
});