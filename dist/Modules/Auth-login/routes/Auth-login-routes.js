"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
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

// src/Modules/Auth-login/routes/Auth-login-routes.ts
var Auth_login_routes_exports = {};
__export(Auth_login_routes_exports, {
  userRouterAuthLogin: () => userRouterAuthLogin
});
module.exports = __toCommonJS(Auth_login_routes_exports);
var import_express = require("express");

// src/Modules/User/model/User.ts
var import_mongoose = require("mongoose");
var userSchema = new import_mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minLength: 6
    },
    role: {
      type: String,
      enum: ["client", "admin"],
      default: "client",
      required: true
    },
    profilePicture: {
      type: String,
      default: ""
    },
    jewelsAmount: {
      type: Number,
      default: 0
    },
    products: [
      {
        type: import_mongoose.Types.ObjectId,
        ref: "Product"
      }
    ],
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);
var UserModel = (0, import_mongoose.model)("User", userSchema);

// src/Modules/User/repository/User-repository.ts
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

// src/Modules/Auth-login/service/Auth-service.ts
var import_bcrypt = __toESM(require("bcrypt"));
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var AuthService = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  login(loginData) {
    return __async(this, null, function* () {
      const user = yield this.userRepository.getByEmail(loginData.email);
      if (!user || !user.password)
        throw new Error("User not found");
      console.log(loginData);
      const userPassword = user.password;
      const passwordMatch = yield import_bcrypt.default.compare(loginData.password, userPassword);
      if (!passwordMatch)
        throw new Error("Email or password incorrect");
      const _a = user, { password } = _a, restUser = __objRest(_a, ["password"]);
      const payload = __spreadValues({}, restUser);
      console.log(payload);
      const secretKey = process.env.JWT_SECRET_KEY;
      const option = { expiresIn: "1d" };
      const token = import_jsonwebtoken2.default.sign(payload, secretKey, option);
      return token;
    });
  }
  getByUserLogged(idLogged) {
    return __async(this, null, function* () {
      const user = yield this.userRepository.getById(idLogged);
      return user;
    });
  }
};

// src/Modules/Auth-login/fatory/Auth-login-factory.ts
var makeAuthLogin = () => {
  const repository = new UserRepository(UserModel);
  const service = new AuthService(repository);
  const controller = new AuthController(service);
  return controller;
};
var AuthLogin = makeAuthLogin();

// src/Middlewares/Auth-login-middleware.ts
var import_jsonwebtoken3 = __toESM(require("jsonwebtoken"));
var AuthRoutePrivateMiddleware = class {
  static handle(req, res, next) {
    return __async(this, null, function* () {
      const { headers } = req;
      if (!(headers == null ? void 0 : headers.authorization)) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const token = headers.authorization.replace("Bearer ", "");
      try {
        import_jsonwebtoken3.default.verify(token, process.env.JWT_SECRET_KEY);
        const payload = import_jsonwebtoken3.default.decode(token);
        if (!payload)
          throw new Error("Invalid token");
      } catch (erro) {
        return res.status(401).json({ message: "Invalid token" });
      }
      next();
    });
  }
};

// src/Modules/Auth-login/routes/Auth-login-routes.ts
var userRouterAuthLogin = (0, import_express.Router)();
userRouterAuthLogin.post("/login", AuthLogin.login.bind(AuthLogin));
userRouterAuthLogin.get(
  "/me",
  /* Rota Privada */
  AuthRoutePrivateMiddleware.handle.bind(AuthRoutePrivateMiddleware),
  AuthLogin.getByUserLogged.bind(AuthLogin)
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userRouterAuthLogin
});
//!passwordMatch? throw new Error('Email or password incorrect') : null
