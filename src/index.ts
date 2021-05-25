import 'module-alias/register';
require('dotenv').config({ path: './process.env' })
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// Routers.
import { loginRouter } from './modules/auth/routes/login'
import { registerRouter } from './modules/auth/routes/register'
import { verifyCodeRouter } from './modules/auth/routes/verifyCode'
import { userInfoRouter } from './modules/user-info/routes/user-info'
import { bankcardRouter } from './modules/wallet/routes/bankcard'
import { depositRouter } from './modules/wallet/routes/deposit'
import { withdrawalRouter } from './modules/wallet/routes/withdrawal'
import { transferRouter } from './modules/wallet/routes/transfer'

// Middlewares.
import verifyJwt from './middelware/verifyJwt';

const app = express()
const corsOptions = {
  origin: ['http://localhost:3000', 'https://yw-uc.herokuapp.com'],
  exposedHeaders: ['accessToken', 'refreshToken']
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(loginRouter)
app.use(registerRouter)
app.use(verifyCodeRouter)
app.use(bankcardRouter) // Including bankcardimg router, which probably shouldn't need token to auth.
app.use(verifyJwt);
app.use(userInfoRouter)
app.use(depositRouter)
app.use(withdrawalRouter)
app.use(transferRouter)

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening on port ${port}.`))
