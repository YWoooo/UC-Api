require('dotenv').config({ path: './process.env' })
import express from 'express'
import { loginRouter } from './routes/loginRoutes'
import { registerRouter } from './routes/registerRoutes'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(loginRouter)
app.use(registerRouter)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}.`))
