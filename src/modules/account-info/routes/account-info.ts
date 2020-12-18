import { Router } from 'express'

const accountInfoRouter = Router()

accountInfoRouter.get('/accountInfo', async (req, res) => {
  try {
    res.send({
      message: 'Testing.'
    })
  } catch (e) {
    console.log('In accountInfo route: ', e)
    res.status(500).send({ code: 500 })
  }
})

export { accountInfoRouter }
