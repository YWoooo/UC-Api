require('dotenv').config({ path: './process.env' })
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// Routers.
import { loginRouter } from './routes/loginRoutes'
import { registerRouter } from './modules/auth/routes/register'
import { accountInfoRouter } from './modules/account-info/routes/account-info'

// Middlewares.
import { authByToken } from './middelware/auth-by-token';

const app = express()
const corsOptions = {
  origin: ['http://localhost:3000',]
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(loginRouter)
app.use(registerRouter)
app.use(authByToken);
app.use(accountInfoRouter)

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening on port ${port}.`))
