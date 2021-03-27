export namespace VerifyCode {
  export interface Entity {
    receiver: string;
    receiverType: ReceiverType;
    code: string;
    createdTime: number;
    expire: number;
  }
  export interface Params {
    receiver: string;
    receiverType: ReceiverType;
  }
  export type ReceiverType = 'email' | 'phone'
}