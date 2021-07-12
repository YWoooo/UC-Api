import bcrypt from 'bcrypt'

export const hash = async (pwd: string): Promise<string> =>
  await bcrypt.hash(pwd, 10)

export const compare = async (
  pwdToCompare: string,
  pwdInDb: string
): Promise<boolean> => await bcrypt.compare(pwdToCompare, pwdInDb)
