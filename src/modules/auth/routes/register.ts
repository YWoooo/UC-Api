import { Router } from 'express'
import { register } from '../models/register'
import { res500 } from '../../../configs/common-reses'

const registerRouter = Router()

registerRouter.post('/register', async (req, res) => {
  const { email, password } = req.body
  const params = {
    email,
    password,
    time: Date.now()
  }

  try {
    return res.send(await register(params))
  } catch (e) {
    console.log('In register route: ', e)
    res.status(500).send(res500)
  }
})

export { registerRouter }
