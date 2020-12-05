import { Router } from 'express'
import { res500 } from '@/src/configs/common-reses'
import { deposit } from '../models/deposit'
const depositRouter = Router()

depositRouter.post('/deposit', async (req, res) => {
  try {
    const sendData = await deposit(req.body)
    return res.status(sendData.code).send(sendData)
  } catch (e) {
    console.log('In deposit route: ', e)
    res.status(500).send(res500)
  }
})

export { depositRouter }
