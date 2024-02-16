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

// src/Modules/Auth-login/controller/Auth-login-controller.ts
var Auth_login_controller_exports = {};
__export(Auth_login_controller_exports, {
  AuthController: () => AuthController
});
module.exports = __toCommonJS(Auth_login_controller_exports);

// src/Modules/Auth-login/utils/Auth-body-validator-YUP.ts
var yup = __toESM(require("yup"));
var authBodyValidatorYup = yup.object({
  email: yup.string().required("Email is required").email("Invalid email format"),
  password: yup.string().required("Password is required")
  /* .min(8, 'Password must be at least 8 characters long') */
});

// src/Modules/Auth-login/controller/Auth-login-controller.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var AuthController = class {
  constructor(authService) {
    this.authService = authService;
  }
  login(req, res) {
    return __async(this, null, function* () {
      console.log();
      try {
        const { body } = req;
        yield authBodyValidatorYup.validate(body, { abortEarly: false });
        const resultToken = yield this.authService.login(body);
        res.status(200).json(resultToken);
      } catch (error) {
        res.status(500).json(error);
      }
    });
  }
  getByUserLogged(req, res) {
    return __async(this, null, function* () {
      function getUserIdFromToken(req2) {
        if (req2.headers.authorization) {
          const token = req2.headers.authorization.split(" ")[1];
          const payload = import_jsonwebtoken.default.decode(token);
          if (!payload)
            throw new Error("Invalid token");
          return req2.body = { id: payload._doc._id };
        } else {
          throw new Error("Authorization header not found");
        }
      }
      try {
        const idUser = getUserIdFromToken(req);
        console.log(idUser);
        const userId = idUser.id;
        const result = yield this.authService.getByUserLogged(userId);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthController
});
