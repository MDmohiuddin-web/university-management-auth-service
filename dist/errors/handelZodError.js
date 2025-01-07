"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handelZodError = (error) => {
    const errors = error.issues.map((issue) => {
        return {
            path: String(issue.path[issue.path.length - 1]), // Ensure path is a string
            message: issue.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Zod validation error',
        errorMessages: errors,
    };
};
exports.default = handelZodError;
