import { Router } from 'express'
import authByToken from '@/src/middelware/authByToken';
import { upload } from '../utils/upload'
import handleErrInRoute from '@/src/errors/handleErrInRoute'
import { addBankcard } from '../models/addBankcard'
import { getBankcardImg } from '../models/getBankcardImg'

const bankcardRouter = Router()

bankcardRouter.post(
  '/wallet/bankcard',
  authByToken,
  upload.array('imgs', 3),
  async (req, res) => {
    try {
      await addBankcard({
        account: res.locals.account,
        imgs: getBufferString(req.files as Express.Multer.File[]),
        ...req.body
      })
      return res.status(201).send({
        message: 'ok'
      })
    } catch (e) {
      handleErrInRoute(e, res)
    }
  })
const getBufferString = (files: Express.Multer.File[]) =>
  files.map((file) => file.buffer.toString('base64'))

bankcardRouter.get('/wallet/bankcardimg/:account', async (req, res) => {
  try {
    const bankcardImg = await getBankcardImg(req.params.account)
    res.set('Content-Type', 'image/png')
    bankcardImg
      ? res.status(200).send(bankcardImg)
      : res.status(404).send()
  } catch (e) {
    handleErrInRoute(e, res)
  }
})

export { bankcardRouter }
