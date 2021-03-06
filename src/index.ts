import 'module-alias/register'
require('dotenv').config({ path: './process.env' })
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// Routers.
import { loginRouter } from './modules/auth/routes/login'
import { registerRouter } from './modules/auth/routes/register'
import { verifyCodeRouter } from './modules/auth/routes/verifyCode'
import { userInfoRouter } from './modules/user-info/routes/user-info'
import { bindpaymentRouter } from './modules/wallet/routes/bindpayment'
import { depositRouter } from './modules/wallet/routes/deposit'
import { withdrawalRouter } from './modules/wallet/routes/withdrawal'
import { transferRouter } from './modules/wallet/routes/transfer'

// Middlewares.
import verifyJwt from './middelware/verifyJwt'

const app = express()
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:8080',
    'https://ywchang-wallet.netlify.app',
    'https://yw-uc.herokuapp.com',
  ],
  exposedHeaders: ['accessToken', 'refreshToken'],
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(loginRouter)
app.use(registerRouter)
app.use(verifyCodeRouter)
app.use(verifyJwt)
app.use(userInfoRouter)
app.use(depositRouter)
app.use(withdrawalRouter)
app.use(transferRouter)
app.use(bindpaymentRouter)

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening on port ${port}.`))
