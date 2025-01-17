"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hadesCastError = (error) => {
    const errors = [
        {
            path: error.path,
            message: "invalid id",
        },
    ];
    const statusCode = 400;
    return { statusCode, message: 'Cast Error', errorMessages: errors };
};
exports.default = hadesCastError;
