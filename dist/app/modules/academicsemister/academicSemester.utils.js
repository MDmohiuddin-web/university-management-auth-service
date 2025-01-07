"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convertYearToNumber = (req, res, next) => {
    if (typeof req.body.year === 'string') {
        req.body.year = Number(req.body.year);
    }
    next();
};
exports.default = convertYearToNumber;
