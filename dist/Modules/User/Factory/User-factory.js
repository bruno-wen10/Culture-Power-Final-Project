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

// src/Modules/User/Factory/User-factory.ts
var User_factory_exports = {};
__export(User_factory_exports, {
  makeUser: () => makeUser,
  userModule: () => userModule
});
module.exports = __toCommonJS(User_factory_exports);

// src/Modules/Product/model/Products.ts
var import_mongoose = require("mongoose");
var ProductsSchema = new import_mongoose.Schema({
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
var ProductModel = (0, import_mongoose.model)("Products", ProductsSchema);

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
var import_mongoose2 = require("mongoose");
var userSchema = new import_mongoose2.Schema(
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
        type: import_mongoose2.Types.ObjectId,
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
var UserModel = (0, import_mongoose2.model)("User", userSchema);

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
var import_mongoose3 = require("mongoose");
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
      if (!(0, import_mongoose3.isValidObjectId)(id))
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
      if (!(0, import_mongoose3.isValidObjectId)(userId))
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
      if (!(0, import_mongoose3.isValidObjectId)(id))
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
      if (!(0, import_mongoose3.isValidObjectId)(id)) {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeUser,
  userModule
});
