import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersService from './app/modules/users/users.service'
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// testing
app.get('/', async (req: Request, res: Response) => {
  await usersService.createUser({ id: '000001', role: 'admin', password: '1234' })
  console.log('hit')
  res.send('working successfully')
})

export default app
