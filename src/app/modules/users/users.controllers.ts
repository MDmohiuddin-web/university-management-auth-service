import { Request, Response } from 'express'
import usersService from './users.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await usersService.createUser(req.body)
    res.status(201).json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'failed to create user' })
  }
}
