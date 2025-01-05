import { RequestHandler } from 'express'
import { usersService } from './user.service'
import { z } from 'zod'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const createUserZodSchema = z.object({
      body: z.object({
        role: z.string({
          required_error: 'role is required',
        }),
        password: z.string().optional(),
      }),
    })
    
    // Parse and validate the request body
    await createUserZodSchema.parseAsync({ body: req.body })
    
    const { user } = req.body
    const result = await usersService.createUser(user)
    res.status(200).json({
      data: result,
      message: 'user created successfully',
      status: true,
    })
  } catch (error) {
    next(error)
  }
}

export const UserController = {
  createUser,
}

