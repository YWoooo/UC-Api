import CustomError from '@/src/errors/prototype'
import { withdrawalConfigs } from '../configs/withdrawal-configs'

export default () => {
  const hour = new Date().getHours()
  const inOfficeHour =
    hour > withdrawalConfigs.officeHours[0] - 1 &&
    hour < withdrawalConfigs.officeHours[1] - 1

  if (!inOfficeHour) {
    // TODO: is it really 400?
    throw new CustomError({
      name: 'NotOfficeHourError',
      status: 400,
      message: `The office hour is ${withdrawalConfigs.officeHours}`
    })
  }
}