import { Router } from 'express'
import { register } from '../models/register'
const registerRouter = Router()

registerRouter.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      throw new Error('Missing params.')
    }
    const sendData = await register({ email, password })
    return res
      .status(201)
      .send(sendData)

  } catch (e) {
    const code = err400.indexOf(e.message) !== -1 ? 400 : 500
    res.status(code).send({
      message: e.message
    })
  }
})

const err400 = [
  'Missing params.',
  'Email exist.'
]

export { registerRouter }
