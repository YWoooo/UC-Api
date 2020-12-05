// Utils & configs.
import { getCollection } from '@/src/utils/get-collection';
import { res500 } from '@/src/configs/common-reses'
// Types.
import { Res } from '@/src/types/res';
import { DepositParams } from '../types/deposit';

export const deposit = async (params: DepositParams): Promise<Res<null>> => {
  try {
    const collection = await getCollection('user')
    const { account, toAmount } = params
    await collection.findOneAndUpdate({ account }, { $inc: { balance: +toAmount } })
    return {
      code: 1,
      data: null,
      message: 'Deposit success.'
    }
  } catch (e) {
    console.log('In deposit model: ', e)
    return res500
  }
}
