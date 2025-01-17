import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodEffects } from 'zod'



const ValidationRequest =
  (Schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
