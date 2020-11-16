import { Router } from 'express'
import { res500 } from '../../../configs/common-reses'

const accountInfoRouter = Router()

accountInfoRouter.get('/accountInfo', async (req, res) => {
  try {
    res.send({
      message: 'Testing.'
    })
  } catch (e) {
    console.log('In accountInfo route: ', e)
    res.status(500).send(res500)
  }
})

export { accountInfoRouter }
