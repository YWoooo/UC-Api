import { Router } from 'express'
import { register } from '../models/registerModels'
import { RegisterDataInterface } from '../interfaces/registerData'
import isEmail from 'validator/lib/isEmail';
const // 至少一小寫，至少一大寫，至少一數字，6 ~ 15 位
    passwordRule = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*^.{6,15}$)/,
    registerRouter = Router()

registerRouter.post('/register', async (req, res) => {
    const { email, password } = req.body
    if (isEmail(email) === false ||
        passwordRule.test(password) === false)
        return res.send({ status: -2 })
    const
        sendData: RegisterDataInterface = { email, password, time: Date.now() },
        status = await register(sendData)
    return res.send({ status })
})
export { registerRouter }
