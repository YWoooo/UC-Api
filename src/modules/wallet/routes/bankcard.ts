import { Router } from 'express'
import { upload, getBuffers } from '../utils/upload'
import handleErrInRoute from '@/src/errors/handleErrInRoute'
import { addBankcard } from '../models/addBankcard'

const bankcardRouter = Router()

bankcardRouter.post(
  '/wallet/bankcard',
  upload.array('imgs', 3),
  async (req, res) => {
    try {
      await addBankcard({
        account: res.locals.account,
        imgs: getBuffers(req.files as Express.Multer.File[]),
        ...req.body
      })
      return res.status(201).send({
        message: 'ok'
      })
    } catch (e) {
      handleErrInRoute(e, res)
    }
  })

export { bankcardRouter }
