import { Router } from 'express'
import { register } from '../models/register'
import { res400, res500, setStatusCode } from '@/src/configs/common-reses'
const registerRouter = Router()

registerRouter.post('/register', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).send({ code: 400 })

  try {
    const sendData = await register({ email, password })
    return res.status(setStatusCode(sendData.code)).send(sendData)
  } catch (e) {
    console.log('In register route: ', e)
    res.status(500).send({ code: 500 })
  }
})

export { registerRouter }
