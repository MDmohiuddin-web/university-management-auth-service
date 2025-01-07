"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const zod_1 = require("zod");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createUserZodSchema = zod_1.z.object({
            body: zod_1.z.object({
                role: zod_1.z.string({
                    required_error: 'role is required',
                }),
                password: zod_1.z.string().optional(),
            }),
        });
        // Parse and validate the request body
        yield createUserZodSchema.parseAsync({ body: req.body });
        const { user } = req.body;
        const result = yield user_service_1.usersService.createUser(user);
        res.status(200).json({
            data: result,
            message: 'user created successfully',
            status: true,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.UserController = {
    createUser,
};
