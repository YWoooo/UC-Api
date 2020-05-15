import { Router } from 'express'

const loginRouter = Router()

loginRouter.get('/login', (req, res) => {
    res.send('This is a login route.')
})

export { loginRouter }
