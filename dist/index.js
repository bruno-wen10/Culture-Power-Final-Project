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

// src/index.ts
var import_express4 = __toESM(require("express"));
var import_dotenv2 = __toESM(require("dotenv"));

// src/database/Mongo-config.ts
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

// src/Modules/User/routes/User-routes.ts
var import_express = require("express");

// src/Modules/Product/model/Products.ts
var import_mongoose2 = require("mongoose");
var ProductsSchema = new import_mongoose2.Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  Amount: {
    type: Number,
    default: 0,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  productPicture: {
    type: String,
    default: ""
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});
var ProductModel = (0, import_mongoose2.model)("Products", ProductsSchema);

// src/Modules/Product/repository/Product-repository.ts
var ProductRepository = class {
  constructor(productModel) {
    this.productModel = productModel;
  }
  getAll() {
    return __async(this, null, function* () {
      const products = yield this.productModel.find({ Amount: { $gt: 0 } });
      return products;
    });
  }
  getById(id) {
    return __async(this, null, function* () {
      const product = yield this.productModel.findById(id);
      return product;
    });
  }
  create(product) {
    return __async(this, null, function* () {
      const createdProduct = yield this.productModel.create(product);
      return createdProduct;
    });
  }
  decrementProductsAmount(idProduct, amount) {
    return __async(this, null, function* () {
      const product = yield this.productModel.findByIdAndUpdate(idProduct, { $inc: { Amount: -amount } }, { new: true });
      return product;
    });
  }
  update(idProduct, newProduct) {
    return __async(this, null, function* () {
      const updatedProduct = yield this.productModel.findByIdAndUpdate(
        idProduct,
        newProduct
      );
      return updatedProduct;
    });
  }
  softDelete(id) {
    return __async(this, null, function* () {
      const deletedProduct = yield this.productModel.findByIdAndDelete(id);
      return deletedProduct;
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

// src/Modules/User/model/User.ts
var import_mongoose3 = require("mongoose");
var userSchema = new import_mongoose3.Schema(
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
        type: import_mongoose3.Types.ObjectId,
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
var UserModel = (0, import_mongoose3.model)("User", userSchema);

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

// src/Modules/User/service/User-service.ts
var import_mongoose4 = require("mongoose");
var import_bcrypt = __toESM(require("bcrypt"));
var UserService = class {
  constructor(userRepository, productRepository) {
    this.userRepository = userRepository;
    this.productRepository = productRepository;
  }
  getByEmail(email) {
    return __async(this, null, function* () {
      console.log(`Buscando usu\xE1rio por e-mail: ${email}`);
      const userEmail = yield this.userRepository.getByEmail(email);
      if (!userEmail)
        throw new Error("Email not found");
      return userEmail;
    });
  }
  getById(id) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose4.isValidObjectId)(id))
        throw new Error("Invalid id");
      const userId = yield this.userRepository.getById(id);
      if (!userId)
        throw new Error("User not found");
      return userId;
    });
  }
  create(userData) {
    return __async(this, null, function* () {
      const { email } = userData;
      const userAlreadyExist = yield this.userRepository.getByEmail(
        email
      );
      if (userAlreadyExist)
        throw new Error("User already exist");
      userData.password = yield import_bcrypt.default.hash(userData.password, 10);
      const newUser = yield this.userRepository.create(userData);
      if (!newUser) {
        throw new Error("User not created");
      }
      return newUser;
    });
  }
  updateUserRoleToAdmin(userId, newAdmin) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose4.isValidObjectId)(userId))
        throw new Error("Invalid id");
      const adminId = yield this.userRepository.getById(userId);
      if (!adminId)
        throw new Error("error: invalid id");
      const admin = yield this.userRepository.updateUserRoleToAdmin(
        userId,
        newAdmin
      );
      return admin;
    });
  }
  sendJewelryToUser(idUser, jewel) {
    return __async(this, null, function* () {
      const userId = yield this.userRepository.getById(idUser);
      if (!userId)
        throw new Error("error: invalid id");
      console.log(jewel);
      const user = yield this.userRepository.sendJewelryToUser(idUser, jewel);
      return user;
    });
  }
  updateUser(id, newUser) {
    return __async(this, null, function* () {
      console.log("chegou no Servi\xE7o");
      if (!(0, import_mongoose4.isValidObjectId)(id))
        throw new Error("Invalid id");
      const user = yield this.userRepository.getById(id);
      if (!user)
        throw new Error("error: invalid id");
      newUser.password = yield import_bcrypt.default.hash(newUser.password, 10);
      const updatedUser = yield this.userRepository.updateUser(id, newUser);
      if (!updatedUser) {
        throw new Error("error: cant update User");
      }
      return updatedUser;
    });
  }
  addProducts(idUser, idProducts) {
    return __async(this, null, function* () {
      console.log("chegou no Servi\xE7o", idUser, idProducts);
      const userId = yield this.userRepository.getById(idUser);
      const productsId = yield this.productRepository.getById(idProducts);
      if (!userId || !productsId)
        throw new Error("User or product not found");
      if (typeof userId.jewelsAmount !== "number" || typeof productsId.value !== "number")
        throw new Error("invalid data type");
      if (userId.jewelsAmount < productsId.value) {
        throw new Error("User does not have enough jewelry to redeem product");
      }
      if (productsId.Amount < 1)
        throw new Error("product not available");
      const jewelsAmountResult = userId.jewelsAmount -= productsId.value;
      console.log(jewelsAmountResult);
      yield this.userRepository.updateUser(idUser, { jewelsAmount: jewelsAmountResult });
      yield this.productRepository.decrementProductsAmount(idProducts, 1);
      const products = yield this.userRepository.addProducts(idUser, idProducts);
      return products;
    });
  }
  softDelete(id) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose4.isValidObjectId)(id)) {
        throw new Error("Invalid Id");
      }
      const idUser = yield this.userRepository.getById(id);
      if (!idUser) {
        throw new Error("error: Invalid or does not match any existing user.");
      }
      const deletedUser = yield this.userRepository.softDelete(id);
      if (!deletedUser)
        throw new Error("cant delete team");
      return deletedUser;
    });
  }
};

// src/Modules/User/Factory/User-factory.ts
function makeUser() {
  const productsRepository = new ProductRepository(ProductModel);
  const repository = new UserRepository(UserModel);
  const service = new UserService(repository, productsRepository);
  const controller = new UserController(service);
  return controller;
}
var userModule = makeUser();

// src/Modules/User/Middlewares/pictureProfile-uploud-middleware.ts
var import_multer = __toESM(require("multer"));
var import_path = __toESM(require("path"));
var configPicture = (0, import_multer.diskStorage)({
  destination(req, file, callback) {
    callback(null, "./Uplouds-image-profile");
  },
  filename(req, file, callback) {
    callback(null, Date.now() + import_path.default.extname(file.originalname));
  }
});
var uploudPictureProfile = (0, import_multer.default)({ storage: configPicture });

// src/Middlewares/Auth-login-middleware.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var AuthRoutePrivateMiddleware = class {
  static handle(req, res, next) {
    return __async(this, null, function* () {
      const { headers } = req;
      if (!(headers == null ? void 0 : headers.authorization)) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const token = headers.authorization.replace("Bearer ", "");
      try {
        import_jsonwebtoken.default.verify(token, process.env.JWT_SECRET_KEY);
        const payload = import_jsonwebtoken.default.decode(token);
        if (!payload)
          throw new Error("Invalid token");
      } catch (erro) {
        return res.status(401).json({ message: "Invalid token" });
      }
      next();
    });
  }
};

// src/Modules/User/Middlewares/Verify-Admin-middleware.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var VerifyAdmin = class {
  static isAdmin(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) == null ? void 0 : _a.split(" ")[1];
    if (!token)
      return res.status(403).json({ message: "Token not provided" });
    try {
      const decodeToken = import_jsonwebtoken2.default.decode(token);
      if (decodeToken && decodeToken._doc.role !== "admin") {
        throw new Error("Invalid token");
      }
    } catch (error) {
      res.status(401).json({ message: error });
    }
    next();
  }
};

// src/Modules/User/routes/User-routes.ts
var userRoutes = (0, import_express.Router)();
userRoutes.get("/userEmail", userModule.getByEmail.bind(userModule));
userRoutes.get(
  "/user/:id",
  /*RotaPrivada */
  AuthRoutePrivateMiddleware.handle.bind(AuthRoutePrivateMiddleware),
  userModule.getById.bind(userModule)
);
userRoutes.post(
  "/user",
  /* Rota Publica*/
  uploudPictureProfile.single("profilePicture"),
  userModule.create.bind(userModule)
);
userRoutes.put(
  "/user/addProducts",
  /* Rota Privada */
  //AuthRoutePrivateMiddleware.handle.bind(AuthRoutePrivateMiddleware), 
  userModule.addProducts.bind(userModule)
);
userRoutes.put(
  "/user/:id/send-jewel",
  /* Rota Privada*/
  VerifyAdmin.isAdmin,
  userModule.sendJewelryToUser.bind(userModule)
);
userRoutes.put(
  "/user/:id/updateRoleToAdmin",
  /* Rota Privada*/
  VerifyAdmin.isAdmin,
  userModule.updateUserRoleToAdmin.bind(userModule)
);
userRoutes.put(
  "/user/:id",
  /* Rota Privada*/
  AuthRoutePrivateMiddleware.handle.bind(AuthRoutePrivateMiddleware),
  userModule.updateUser.bind(userModule)
);
userRoutes.delete(
  "/user/:id",
  /* Rota Privada */
  AuthRoutePrivateMiddleware.handle.bind(AuthRoutePrivateMiddleware),
  userModule.softDelete.bind(userModule)
);

// src/Modules/Auth-login/routes/Auth-login-routes.ts
var import_express2 = require("express");

// src/Modules/Auth-login/controller/Auth-login-controller.ts
var import_jsonwebtoken3 = __toESM(require("jsonwebtoken"));
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
          const payload = import_jsonwebtoken3.default.decode(token);
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
var import_bcrypt2 = __toESM(require("bcrypt"));
var import_jsonwebtoken4 = __toESM(require("jsonwebtoken"));
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
      const passwordMatch = yield import_bcrypt2.default.compare(loginData.password, userPassword);
      if (!passwordMatch)
        throw new Error("Email or password incorrect");
      const _a = user, { password } = _a, restUser = __objRest(_a, ["password"]);
      const payload = __spreadValues({}, restUser);
      console.log(payload);
      const secretKey = process.env.JWT_SECRET_KEY;
      const option = { expiresIn: "1d" };
      const token = import_jsonwebtoken4.default.sign(payload, secretKey, option);
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

// src/Modules/Auth-login/routes/Auth-login-routes.ts
var userRouterAuthLogin = (0, import_express2.Router)();
userRouterAuthLogin.post("/login", AuthLogin.login.bind(AuthLogin));
userRouterAuthLogin.get(
  "/me",
  /* Rota Privada */
  AuthRoutePrivateMiddleware.handle.bind(AuthRoutePrivateMiddleware),
  AuthLogin.getByUserLogged.bind(AuthLogin)
);

// src/Modules/Product/routes/Products-routes.ts
var import_express3 = require("express");

// src/Modules/Product/utils/Products-Create-validator.ts
var yup2 = __toESM(require("yup"));
var productsCreateValidatorYup = yup2.object({
  name: yup2.string().required("Name is required"),
  value: yup2.number().required("Value is required"),
  Amount: yup2.number().required("Amount is required"),
  description: yup2.string().required("Description is required"),
  productPicture: yup2.string()
  //.required('Image is required')
});

// src/Modules/Product/controller/Products-controller.ts
var ProductsController = class {
  constructor(service) {
    this.service = service;
  }
  getAll(req, res) {
    return __async(this, null, function* () {
      console.log("rodou!");
      try {
        const result = yield this.service.getAll();
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ message: error.message });
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
        yield productsCreateValidatorYup.validate(body, { abortEarly: false });
        const result = yield this.service.create(body);
        res.status(201).json(result);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
    });
  }
  update(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const { body } = req;
        console.log("chegou no Controler", req.body);
        const result = yield this.service.update(id, body);
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
        res.status(500).json({ message: error.message });
      }
    });
  }
};

// src/Modules/Product/service/Procuts-service.ts
var import_mongoose5 = require("mongoose");
var ProductService = class {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  getAll() {
    return __async(this, null, function* () {
      return yield this.productRepository.getAll();
    });
  }
  getById(id) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose5.isValidObjectId)(id))
        throw new Error("Invalid id");
      const productId = yield this.productRepository.getById(id);
      if (!productId)
        throw new Error("Products not found");
      return productId;
    });
  }
  create(product) {
    return __async(this, null, function* () {
      const productCreated = yield this.productRepository.create(product);
      return productCreated;
    });
  }
  update(idProduct, newProduct) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose5.isValidObjectId)(idProduct))
        throw new Error("Invalid id");
      const productUpdated = yield this.productRepository.update(idProduct, newProduct);
      if (!productUpdated)
        throw new Error("error: cant update product");
      return productUpdated;
    });
  }
  softDelete(id) {
    return __async(this, null, function* () {
      if (!(0, import_mongoose5.isValidObjectId)(id))
        throw new Error("Invalid id");
      const idProduct = yield this.productRepository.getById(id);
      if (!idProduct)
        throw new Error("Error: Invalid or does not match any existing product");
      const productDeleted = yield this.productRepository.softDelete(id);
      if (!productDeleted)
        throw new Error("error: cant delete product");
      return productDeleted;
    });
  }
};

// src/Modules/Product/factory/Products-factory.ts
var makeProducts = class {
  static makeProducts() {
    const repository = new ProductRepository(ProductModel);
    const service = new ProductService(repository);
    const controller = new ProductsController(service);
    return controller;
  }
};
var productsModule = makeProducts.makeProducts();

// src/Modules/Product/Middlewares/imageProducts-uploud-middleware.ts
var import_multer2 = __toESM(require("multer"));
var import_path2 = __toESM(require("path"));
var configPictureProduct = (0, import_multer2.diskStorage)({
  destination: function(req, file, cb) {
    cb(null, "./Uplouds-image-products");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + import_path2.default.extname(file.originalname));
  }
});
var uploudPictureProduct = (0, import_multer2.default)({ storage: configPictureProduct });

// src/Modules/Product/routes/Products-routes.ts
var productsRouter = (0, import_express3.Router)();
productsRouter.get(
  "/",
  /* Rota Privada */
  AuthRoutePrivateMiddleware.handle.bind(AuthRoutePrivateMiddleware),
  productsModule.getAll.bind(productsModule)
);
productsRouter.get(
  "/products/:id",
  /* Rota Privada */
  AuthRoutePrivateMiddleware.handle.bind(AuthRoutePrivateMiddleware),
  productsModule.getById.bind(productsModule)
);
productsRouter.post(
  "/products",
  /* Rota Privada */
  uploudPictureProduct.single("productPicture"),
  VerifyAdmin.isAdmin.bind(VerifyAdmin),
  productsModule.create.bind(productsModule)
);
productsRouter.put(
  "/products/:id",
  /* Rota Privada */
  VerifyAdmin.isAdmin.bind(VerifyAdmin),
  productsModule.update.bind(productsModule)
);
productsRouter.delete(
  "/products/:id",
  /* Rota Privada */
  VerifyAdmin.isAdmin.bind(VerifyAdmin),
  productsModule.softDelete.bind(productsModule)
);

// src/index.ts
import_dotenv2.default.config();
MongooseConfig.InicializeConnection();
var app = (0, import_express4.default)();
app.use(import_express4.default.json());
app.use(productsRouter);
app.use(userRouterAuthLogin);
app.use(userRoutes);
app.listen(process.env.PORT, () => {
  console.log(`\u{1F31D} Server is running on port ${process.env.PORT}`);
});
//!passwordMatch? throw new Error('Email or password incorrect') : null
