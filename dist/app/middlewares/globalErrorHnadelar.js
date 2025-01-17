"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const validationErrorHandler_1 = __importDefault(require("../../errors/validationErrorHandler"));
const ApiErrors_1 = __importDefault(require("../../errors/ApiErrors"));
const logger_1 = require("../../shared/logger");
const zod_1 = require("zod");
const handelZodError_1 = __importDefault(require("../../errors/handelZodError"));
const hadesCastError_1 = __importDefault(require("../../errors/hadesCastError"));
const globalErrorHandler = (error, req, res, next) => {
    // console.log(error)
    config_1.default.env === 'development'
        ? console.log(error, 'globalErrorHandler ✌️🧨')
        : logger_1.errorLogger.error(error, 'globalErrorHandler 😲');
    let statusCode = 500;
    let message = 'Something went wrong';
    let errMessage = [];
    /**
     * Handle mongoose validation errors
     */
    if (error.name === 'ValidationError') {
        const simpleErrors = (0, validationErrorHandler_1.default)(error);
        statusCode = simpleErrors.statusCode;
        message = simpleErrors.message;
        errMessage = simpleErrors.errorMessages;
    }
    else if (error instanceof zod_1.ZodError) {
        const simpleErrors = (0, handelZodError_1.default)(error);
        statusCode = simpleErrors.statusCode;
        message = simpleErrors.message;
        errMessage = simpleErrors.errorMessages;
    }
    else if (error.name === 'CastError') {
        // res.status(400).json({error})
        const simpleFideError = (0, hadesCastError_1.default)(error);
        statusCode = simpleFideError.statusCode;
        message = simpleFideError.message;
        errMessage = simpleFideError.errorMessages;
    }
    else if (error instanceof ApiErrors_1.default) {
        /**
         * Handle custom API errors
         */
        statusCode = error.statusCode;
        message = error.message;
        errMessage = error.message
            ? [
                {
                    path: '',
                    message: error.message,
                },
            ]
            : [];
    }
    else if (error instanceof Error) {
        /**
         * Handle general errors
         */
        message = error.message;
        errMessage = error.message
            ? [
                {
                    path: '',
                    message: error.message,
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
        stack: config_1.default.env !== 'production' ? error.stack : undefined,
    });
    /**
     * Call the next middleware
     */
};
exports.default = globalErrorHandler;
