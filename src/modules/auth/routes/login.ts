import { Router } from 'express'
import { login } from '../models/login'
import { setStatusCode } from '@/src/utils/set-status-code'

const loginRouter = Router()

loginRouter.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).send({ code: 400 })

  try {
    const { code, headers } = await login({ email, password })
    return res
      .status(setStatusCode(code))
      .header('AccessToken', headers?.accessToken)
      .header('RefreshToken', headers?.refreshToken)
      .send({ message: 'ok' })
  } catch (e) {
    console.log('In register route: ', e)
    res.status(500).send({ code: 500 })
  }
})

export { loginRouter }
