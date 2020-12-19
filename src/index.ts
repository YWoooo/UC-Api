import 'module-alias/register';
require('dotenv').config({ path: './process.env' })
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// Routers.
import { loginRouter } from './modules/auth/routes/login'
import { registerRouter } from './modules/auth/routes/register'
import { userInfoRouter } from './modules/user-info/routes/user-info'
import { accountInfoRouter } from './modules/account-info/routes/account-info'
import { depositRouter } from './modules/wallet/routes/deposit'
import { withdrawalRouter } from './modules/wallet/routes/withdrawal'
import { transferRouter } from './modules/wallet/routes/transfer'

// Middlewares.
import { authByToken } from './middelware/auth-by-token';

const app = express()
const corsOptions = {
  origin: ['http://localhost:3000',]
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(loginRouter)
app.use(registerRouter)
app.use(authByToken);
app.use(userInfoRouter)
app.use(accountInfoRouter)
app.use(depositRouter)
app.use(withdrawalRouter)
app.use(transferRouter)

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening on port ${port}.`))
