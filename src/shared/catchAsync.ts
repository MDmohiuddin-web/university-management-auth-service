import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (fn:RequestHandler) => (req: Request, res: Response, next:NextFunction) => {
    try {
        fn(req, res, next);
    } catch (error) {
        
    }
};

export default catchAsync;