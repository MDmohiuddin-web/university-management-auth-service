"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = (fn) => (req, res, next) => {
    try {
        fn(req, res, next);
    }
    catch (error) {
    }
};
exports.default = catchAsync;
