import { Router } from 'express'
import { setStatusCode } from '@/src/utils/set-status-code'
import { transfer } from '../models/transfer'
const transferRouter = Router()

transferRouter.post('/transfer', async (req, res) => {
  try {
    const sendData = await transfer(req.body)
    return res.status(setStatusCode(sendData.code)).send(sendData)
  } catch (e) {
    console.log('In transfer route: ', e)
    res.status(500).send({ code: 500 })
  }
})

export { transferRouter }
