import { Router } from 'express'
import handleErrInRoute from '@/src/errors/handleErrInRoute'
import { deposit } from '../models/deposit'
const depositRouter = Router()

depositRouter.post('/deposit', async (req, res) => {
  try {
    await deposit(req.body)
    return res.status(201).send({
      message: 'ok'
    })
  } catch (e) {
    handleErrInRoute(e, res)
  }
})

export { depositRouter }
