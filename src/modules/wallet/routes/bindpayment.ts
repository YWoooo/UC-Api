import { Router } from 'express'
import { bindCreditcard } from '../models/bindCreditcard'
import handleErrInRoute from '@/src/errors/handleErrInRoute'
const bindpaymentRouter = Router()

bindpaymentRouter.post(
  '/api/v1.0.0/wallet/bindpayment/creditcard',
  async (req, res) => {
    try {
      await bindCreditcard(req, res)
      return res.status(201).send({
        message: 'ok',
      })
    } catch (e) {
      handleErrInRoute(e, res)
    }
  }
)

export { bindpaymentRouter }
