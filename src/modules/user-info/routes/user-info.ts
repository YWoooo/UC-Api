import { Router } from 'express'
import { setStatusCode } from '@/src/utils/set-status-code'
import { getUserInfo } from '../models/user-info'
const userInfoRouter = Router()

userInfoRouter.get('/userInfo', async (req, res) => {
  try {
    const sendData = await getUserInfo(res.locals.account)
    return res.status(setStatusCode(sendData.code)).send(sendData)
  } catch (e) {
    console.log('In user info route: ', e)
    res.status(500).send({ code: 500 })
  }
})

export { userInfoRouter }
