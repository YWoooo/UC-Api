import { Router } from 'express'
import { register } from '../models/register'
import { res400, res500 } from '@/src/configs/common-reses'

const registerRouter = Router()

registerRouter.post('/register', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).send(res400)

  try {
    return res.send(await register({ email, password }))
  } catch (e) {
    console.log('In register route: ', e)
    res.status(500).send(res500)
  }
})

export { registerRouter }
