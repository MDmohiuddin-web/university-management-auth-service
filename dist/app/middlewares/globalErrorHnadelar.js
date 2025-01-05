"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const validationErrorHandler_1 = __importDefault(require("../../errors/validationErrorHandler"));
const ApiErrors_1 = __importDefault(require("../../errors/ApiErrors"));
const logger_1 = require("../../shared/logger");
/**
 * Global error handler middleware
 * @param {Error} err - The error object to be handled
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware to be called after this one
 */
const globalErrorHandler = (err, req, res, next) => {
    config_1.default.env === 'development'
        ? console.log(err, 'globalErrorHandler ✌️🧨')
        : logger_1.errorLogger.error(err, 'globalErrorHandler 😲');
    let statusCode = 500;
    let message = 'Something went wrong';
    let errMessage = [];
    /**
     * Handle mongoose validation errors
     */
    if (err.name === 'ValidationError') {
        const simpleErrors = (0, validationErrorHandler_1.default)(err);
        statusCode = simpleErrors.statusCode;
        message = simpleErrors.message;
        errMessage = simpleErrors.errorMessages;
    }
    else if (err instanceof ApiErrors_1.default) {
        /**
         * Handle custom API errors
         */
        statusCode = err.statusCode;
        message = err.message;
        errMessage = err.message
            ? [
                {
                    path: '',
                    message: err.message,
                },
            ]
            : [];
    }
    else if (err instanceof Error) {
        /**
         * Handle general errors
         */
        message = err.message;
        errMessage = err.message
            ? [
                {
                    path: '',
                    message: err.message,
                },
            ]
            : [];
    }
    /**
     * Send the error response
     */
    res.status(statusCode).json({
        success: false,
        message: message,
        errorMessages: errMessage,
        stack: config_1.default.env !== 'production' ? err.stack : undefined,
    });
    /**
     * Call the next middleware
     */
    next();
};
exports.default = globalErrorHandler;
