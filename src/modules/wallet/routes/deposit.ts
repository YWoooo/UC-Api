import { Router } from 'express'
import { res400, res500 } from '@/src/configs/common-reses'
import { deposit } from '../models/deposit'
import { objectMapping } from '@/src/utils/object-mapping'
const depositRouter = Router()

depositRouter.post('/deposit', async (req, res) => {
  const keyOfParams = [
    'account',
    'fromAmount',
    'fromCcy',
    'toAmount',
    'toCcy',
    'rate',
    'channel',
  ]
  const depositParams = objectMapping(req.body, keyOfParams)
  if (!depositParams) return res.status(400).send(res400)
  try {
    res.send(await deposit(depositParams))
  } catch (e) {
    console.log('In deposit route: ', e)
    res.status(500).send(res500)
  }
})

export { depositRouter }
