import multer from 'multer'

const limits = {
  fieldSize: 10000000
}

const fileFilter = (
  req: unknown,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (!file.originalname.match(fileTypeReg)) {
    cb(new Error('WrongImgTypeError'))
  }
  cb(null, true)
}
const fileTypeReg = /\.(jpg|jpeg|png)$/

export const upload = multer({
  limits,
  fileFilter
})
