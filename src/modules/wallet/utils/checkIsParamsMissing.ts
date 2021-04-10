import MissingParamsError from '@/src/errors/MissingParams'
import some from 'lodash.some'
import isNil from 'lodash.isnil'

export default (params: any) => {
  const isParamsMissing = some(params, isNil)
  if (isParamsMissing) {
    throw new MissingParamsError()
  }
}