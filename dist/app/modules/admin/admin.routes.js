"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ValidationRequest_1 = __importDefault(require("../../middlewares/ValidationRequest"));
const admin_validation_1 = require("./admin.validation");
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.get('/:id', 
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
admin_controller_1.AdminController.getSingleAdmin);
router.get('/', 
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
admin_controller_1.AdminController.getAllAdmins);
router.patch('/:id', (0, ValidationRequest_1.default)(admin_validation_1.AdminValidation.updateAdmin), 
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
admin_controller_1.AdminController.updateAdmin);
router.delete('/:id', 
//   auth(ENUM_USER_ROLE.SUPER_ADMIN),
admin_controller_1.AdminController.deleteAdmin);
exports.AdminRoutes = router;
