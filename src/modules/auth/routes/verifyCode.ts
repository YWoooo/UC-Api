import { Router } from 'express'
import handleErrInRoute from '@/src/errors/handleErrInRoute'
import { postVerifyCode } from '../models/postVerifyCode'
import { VerifyCode } from '../types/VerifyCode'
const verifyCodeRouter = Router()

verifyCodeRouter.post('/verifyCode', async (req, res) => {
  try {
    await postVerifyCode({
      receiver: req.body.receiver as string,
      receiverType: req.body.receiverType as VerifyCode.ReceiverType
    })
    return res
      .status(201)
      .send({ message: 'ok' })
  } catch (e) {
    handleErrInRoute(e, res)
  }
})

export { verifyCodeRouter }
