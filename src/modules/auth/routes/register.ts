import { Router } from 'express'
import { register } from '../models/register'
import { res500 } from '../../../configs/common-reses'

const registerRouter = Router()

registerRouter.post('/register', async (req, res) => {
  const { email, password } = req.body

  try {
    return res.send(await register({ email, password }))
  } catch (e) {
    console.log('In register route: ', e)
    res.status(500).send(res500)
  }
})

export { registerRouter }
