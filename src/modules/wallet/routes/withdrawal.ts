import { Router } from 'express'
import { setStatusCode } from '@/src/utils/set-status-code'
import { withdrawal } from '../models/withdrawal'
const withdrawalRouter = Router()

withdrawalRouter.post('/withdrawal', async (req, res) => {
  try {
    const { code } = await withdrawal(req.body)
    return res.status(setStatusCode(code)).send({ code })
  } catch (e) {
    console.log('In withdrawal route: ', e)
    res.status(500).send({ code: 500 })
  }
})

export { withdrawalRouter }
