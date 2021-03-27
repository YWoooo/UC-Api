import { Router } from 'express'
import { register } from '../models/register'
const registerRouter = Router()

registerRouter.post('/register', async (req, res) => {
  try {
    const { email, verifycode, password } = req.body
    const isMissingParams = !email || !verifycode || !password
    if (isMissingParams) {
      throw new Error('Missing params.')
    }

    const sendData =
      await register({ email, verifycode, password })
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

// TODO: custom error object with code.
const err400 = [
  'Missing params.',
  'Email exist.',
  'Find no verify code.',
  'Verify code expire.',
  'Wrong verify code.'
]

export { registerRouter }
