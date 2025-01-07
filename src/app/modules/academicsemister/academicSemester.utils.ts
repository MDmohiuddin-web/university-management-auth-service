import { Request, Response, NextFunction } from 'express';

const convertYearToNumber = (req: Request, res: Response, next: NextFunction) => {
  if (typeof req.body.year === 'string') {
    req.body.year = Number(req.body.year);
  }
  next();
};

export default convertYearToNumber;
