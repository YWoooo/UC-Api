import { Router } from 'express'
import { login } from '../models/login'
const loginRouter = Router()

loginRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      throw new Error('Missing params.')
    }
    const { headers } = await login({ email, password })
    return res
      .status(200)
      .header('accessToken', headers?.accessToken)
      .header('refreshToken', headers?.refreshToken)
      .send({ message: 'ok' })

  }
  catch (e) {
    console.log(e)
    const code = err400.indexOf(e.message) !== -1 ? 400 : 500
    res.status(code).send({
      message: e.message
    })
  }
})

const err400 = [
  'User not exist.',
  'Wrong password.',
  'Missing params.'
]

export { loginRouter }
