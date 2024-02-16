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

// src/Modules/User/controller/UserController.ts
var UserController_exports = {};
__export(UserController_exports, {
  UserController: () => UserController
});
module.exports = __toCommonJS(UserController_exports);

// src/Modules/Auth-login/utils/Auth-body-validator-YUP.ts
var yup = __toESM(require("yup"));
var authBodyValidatorYup = yup.object({
  email: yup.string().required("Email is required").email("Invalid email format"),
  password: yup.string().required("Password is required")
  /* .min(8, 'Password must be at least 8 characters long') */
});

// src/Modules/User/controller/UserController.ts
var UserController = class {
  constructor(service) {
    this.service = service;
  }
  getByEmail(req, res) {
    return __async(this, null, function* () {
      try {
        const { email } = req.query;
        const result = yield this.service.getByEmail(email);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json(error);
      }
    });
  }
  getById(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const result = yield this.service.getById(id);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  }
  create(req, res) {
    return __async(this, null, function* () {
      try {
        const { body } = req;
        console.log(body);
        yield authBodyValidatorYup.validate(body, { abortEarly: false });
        const result = yield this.service.create(body);
        res.status(201).json({ message: "User created successfully", user: body });
      } catch (error) {
        res.status(500).json(error);
      }
    });
  }
  updateUserRoleToAdmin(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const { body } = req;
        const result = yield this.service.updateUserRoleToAdmin(id, body);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json(error);
      }
    });
  }
  sendJewelryToUser(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const { body } = req;
        console.log(body);
        const result = yield this.service.sendJewelryToUser(id, body);
        res.status(200).json({ message: "Jewels sent successfully", result });
      } catch (error) {
        res.status(500).json(error);
      }
    });
  }
  updateUser(req, res) {
    return __async(this, null, function* () {
      console.log("chegou no Controler");
      try {
        const { id } = req.params;
        const { body } = req;
        const result = yield this.service.updateUser(id, body);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json(error);
      }
    });
  }
  addProducts(req, res) {
    return __async(this, null, function* () {
      try {
        const { idUser, idProducts } = req.body;
        console.log("chegou no Controler", req.body);
        const result = yield this.service.addProducts(idUser, idProducts);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  }
  softDelete(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const result = yield this.service.softDelete(id);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error });
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserController
});
