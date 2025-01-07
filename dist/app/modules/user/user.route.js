"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("./user.controllers");
const user_validation_1 = require("./user.validation");
const ValidationRequest_1 = __importDefault(require("../../middlewares/ValidationRequest"));
const router = express_1.default.Router();
router.post('/create-user', (0, ValidationRequest_1.default)(user_validation_1.UserValidation.createUserZodSchema), user_controllers_1.UserController.createUser);
exports.userRoutes = router;
