import { KycStatus } from './KycStatus'
import { BankCardStatus } from './BankCardStatus'

export default class User {
  constructor(
    // Basic infos.
    public email: string,
    public password: string,
    public account: string,

    // About kyc.
    public name = '',
    public phone = '',
    public phoneAreaCode = '',
    public isEmailVerified = false,
    public isPhoneVerified = false,
    public kycStatus = KycStatus.neverBefore,
    public bankCardStatus = BankCardStatus.neverBefore,

    // About wallet.
    public balance = 0,
  ) { }

  public get isVerified() {
    return this.isEmailVerified && this.isPhoneVerified && this.kycStatus === KycStatus.success
  }
}
