import { Router } from 'express'
import { login } from '../models/login'
import { setStatusCode, res500 } from '@/src/configs/common-reses'

const loginRouter = Router()

loginRouter.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).send({ code: 400 })

  try {
    const sendData = await login({ email, password })
    return res.status(setStatusCode(sendData.code)).send(sendData)
  } catch (e) {
    console.log('In register route: ', e)
    res.status(500).send({ code: 500 })
  }
})

export { loginRouter }
