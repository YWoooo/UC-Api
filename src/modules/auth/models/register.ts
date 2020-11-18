// Utils & configs.
import { getCollection } from '@/src/utils/get-collection';
import { setJwtForAuth } from '@/src/utils/set-jwt-for-auth';
import { res500 } from '@/src/configs/common-reses'
// Types.
import { Res } from '@/src/types/res';
import { RegisterParams } from '../types/registerData'
import User from '@/src/types/user';

interface ResData {
  token: string;
}

export const register = async ({ email, password }: RegisterParams): Promise<Res<ResData | null>> => {
  try {
    const collection = await getCollection('user')
    const isEmailExist = await collection.findOne({ email })
    if (isEmailExist) {
      return {
        code: 200001,
        data: null,
        message: 'The email is used, please use another email instead.'
      }
    }

    await collection.insertOne(new User(email, password))
    return {
      code: 201,
      data: {
        token: setJwtForAuth(email)
      },
      message: 'Register success.'
    }
  } catch (e) {
    console.log('In register model: ', e)
    return res500
  }
}
