"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controllers_1 = __importDefault(require("./users.controllers"));
const router = express_1.default.Router();
router.post('/create-user', users_controllers_1.default.createUser);
exports.default = router;
