import { Router } from 'express'
import { setStatusCode } from '@/src/utils/set-status-code'
import { deposit } from '../models/deposit'
const depositRouter = Router()

depositRouter.post('/deposit', async (req, res) => {
  try {
    const sendData = await deposit(req.body)
    return res.status(setStatusCode(sendData.code)).send(sendData)
  } catch (e) {
    console.log('In deposit route: ', e)
    res.status(500).send({ code: 500 })
  }
})

export { depositRouter }
