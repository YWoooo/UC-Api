import { BankCardStatus } from '@/src/types/BankCardStatus';
export namespace Bankcard {
  interface Basic {
    account: string;
    bankAccountNo: string;
    holder: string;
    bankName: string;
    branchName: string;
    bankAddress: string;
    ccy: string;
    swiftcode: string;
  }
  export interface FromClient extends Basic {
    imgs: Express.Multer.File[];
  }
  export interface InDb extends Basic {
    imgs: string[]
    createdTime: number
    status: BankCardStatus
  }
}