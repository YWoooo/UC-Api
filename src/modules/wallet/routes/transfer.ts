import { Router } from 'express'
import handleErrInRoute from '@/src/errors/handleErrInRoute'
import { transfer } from '../models/transfer'
const transferRouter = Router()

transferRouter.post('/transfer', async (req, res) => {
  try {
    await transfer(req.body)
    return res.status(201).send({
      message: 'ok'
    })
  } catch (e) {
    handleErrInRoute(e, res)
  }
})

export { transferRouter }
