import { Router } from 'express'
import handleErrInRoute from '@/src/errors/handleErrInRoute'
import { withdrawal } from '../models/withdrawal'
const withdrawalRouter = Router()

withdrawalRouter.post('/withdrawal', async (req, res) => {
  try {
    await withdrawal(req.body)
    return res.status(201).send({
      message: 'ok',
    })
  } catch (e) {
    handleErrInRoute(e, res)
  }
})

export { withdrawalRouter }
