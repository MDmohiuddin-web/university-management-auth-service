"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    res.status(400).json({ Error: err.message });
    next();
};
exports.default = globalErrorHandler;
