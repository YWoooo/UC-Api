// import { Router } from 'express'
// import { register } from '../models/registerModels'
// import { IRegisterData } from '../types/registerData'
// import isEmail from 'validator/lib/isEmail';
// const // 至少一小寫，至少一大寫，至少一數字，6 ~ 15 位
//     passwordRule = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*^.{6,15}$)/,
//     registerRouter = Router()

// registerRouter.post('/register', async (req, res) => {
//     const { email, password } = req.body
//     try {
//         if (isEmail(email) === false ||
//             passwordRule.test(password) === false)
//             return res.send({ code: -20 })
//         const
//             sendData: IRegisterData = { email, password, time: Date.now() },
//             resData = await register(sendData)
//         return res.send(resData)
//     } catch (e) {
//         console.log('In registerRoutes: ', e)
//         res.send({ code: -1 })
//     }
// })
// export { registerRouter }
