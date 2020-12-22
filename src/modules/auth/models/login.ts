// Utils & configs.
import { getCollection } from '@/src/utils/get-collection';
import { setJwtForAuth } from '@/src/utils/set-jwt-for-auth';
import { resCode } from '@/src/configs/resCode'
// Types.
import { Res } from '@/src/types/res';
import { RegisterParams } from '../types/registerData'

interface ResData {
  token: string;
}

export const login = async ({ email, password }: RegisterParams): Promise<Res<ResData>> => {
  try {
    const collection = await getCollection('user')
    const user = await collection.findOne({ email })
    if (!user) return { code: resCode.notExistUser }

    if (user?.password !== password) return { code: 401 }
    return {
      code: 201,
      data: { token: setJwtForAuth(user.account) },
    }
  } catch (e) {
    console.log('In login model: ', e)
    return { code: 500 }
  }
}
