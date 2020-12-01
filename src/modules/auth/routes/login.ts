import { Router } from 'express'
import { login } from '../models/login'
import { res500 } from '@/src/configs/common-reses'

const loginRouter = Router()

loginRouter.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    return res.send(await login({ email, password }))
  } catch (e) {
    console.log('In register route: ', e)
    res.status(500).send(res500)
  }
})

export { loginRouter }
