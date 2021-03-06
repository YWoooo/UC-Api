import { Router } from 'express'
import { getVerifyCode } from '../models/getVerifyCode'

const verifyCodeRouter = Router()

verifyCodeRouter.get('/verifyCode', async (req, res) => {
  try {
    checkParams(req.body)
    await getVerifyCode({
      receiver: req.body.receiver,
      receiverType: req.body.receiverType
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

const checkParams = (body: any) => {
  const { receiver, receiverType } = body
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
