// Utils & configs.
import { getCollection } from '@/src/utils/get-collection';
import { setJwtForAuth } from '@/src/utils/set-jwt-for-auth';
// Types.
import { Res } from '@/src/types/res';
import { RegisterParams } from '../types/registerData'
import User from '@/src/types/user';

interface ResData {
  token: string;
}

export const register = async ({ email, password }: RegisterParams): Promise<Res<ResData>> => {
  try {
    const collection = await getCollection('user')
    const isEmailExist = await collection.findOne({ email })
    if (isEmailExist) return { code: 200001 }
    await collection.insertOne(
      new User(
        email,
        password,
        setAccountString(await collection.countDocuments())
      ))
    return {
      code: 201,
      data: { token: setJwtForAuth(email) }
    }
  } catch (e) {
    console.log('In register model: ', e)
    return { code: 500 }
  }
}

const setAccountString = (no: number) =>
  'N' + `${no + 1}`.padStart(6, '0')
