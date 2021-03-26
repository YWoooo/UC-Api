// Utils & configs.
import { getCollection } from '@/src/utils/get-collection';
import { setAccessToken, setRefreshToken } from '@/src/utils/set-jwt-for-auth';
import { hash } from '@/src/utils/pwd-helper';
// Types.
import { Res } from '@/src/types/res';
import { RegisterParams } from '../types/registerData'
import User from '@/src/types/user';

interface ResData {
  accessToken: string;
  refreshToken: string;
}

export const register = async ({ email, password }: RegisterParams): Promise<Res<ResData>> => {
  try {
    const collection = await getCollection('user')
    const isEmailExist = await collection.findOne({ email })
    if (isEmailExist) return { code: 200001 }
    const hashedPwd = await hash(password)

    await collection.insertOne(
      new User(
        email,
        hashedPwd,
        setAccountString(await collection.countDocuments())
      ))
    const data = {
      accessToken: setAccessToken(email),
      refreshToken: setRefreshToken(email)
    }
    return {
      code: 201,
      data,
    }
  } catch (e) {
    console.log('In register model: ', e)
    return { code: 500 }
  }
}

const setAccountString = (no: number) =>
  'N' + `${no + 1}`.padStart(6, '0')
