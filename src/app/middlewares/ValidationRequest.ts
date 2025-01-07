import { NextFunction, Request, RequestHandler, Response } from 'express'


import { AnyObject } from 'mongoose'

const ValidationRequest =
  (Schema: AnyObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
        cookies: req.cookies,
      })
      next()
    } catch (error) {
      next(error)
    }
  }

export default ValidationRequest
