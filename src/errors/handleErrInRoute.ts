import CustomError from './prototype'
import { Response } from 'express'

export default (e: CustomError | Error, res: Response) => {
  console.error(e)
  e instanceof CustomError ? onCustomError(e, res) : onNormalError(res)
}

const onCustomError = (e: CustomError, res: Response) => {
  const { status, message } = e
  res.status(status).send({
    error: e,
    message,
  })
}

const onNormalError = (res: Response) => {
  res.status(500).send({
    error: 'UnknownError',
    message: 'Unexpected error, please contact us.',
  })
}
