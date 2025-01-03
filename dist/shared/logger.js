"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errorlogger = exports.logger = void 0;
const winston = require("winston");
const path = require("path");
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'),
            level: 'error',
        }),
    ],
});
exports.logger = logger;
const Errorlogger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'),
            level: 'error',
        }),
    ],
});
exports.Errorlogger = Errorlogger;
