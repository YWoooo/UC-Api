import { Router } from 'express'
import { getVerifyCode } from '../models/getVerifyCode'
import { VerifyCode } from '../types/VerifyCode'

const verifyCodeRouter = Router()

verifyCodeRouter.get('/verifyCode', async (req, res) => {
  try {
    checkParams(req.query)
    await getVerifyCode({
      receiver: req.query.receiver as string,
      receiverType: req.query.receiverType as VerifyCode.ReceiverType
    })
    return res
      .status(200)
      .send({ message: 'ok' })
  } catch (e) {
    console.log('In verify code route: ', e.message)
    const is400 =
      e.message === 'Missing params.' ||
      e.message === 'Receiver type wrong.' ||
      e.message === 'It\'s in cooldown.'
    is400
      ? res.status(400).send({ message: e.message })
      : res.status(500).send({ code: 500 })
  }
})

const checkParams = (query: any) => {
  const { receiver, receiverType } = query
  if (!receiver || !receiverType) {
    throw new Error('Missing params.')
  }
  if (
    receiverType !== 'email' &&
    receiverType !== 'phone'
  ) {
    throw new Error('Receiver type wrong.')
  }
}

export { verifyCodeRouter }
