export interface Res<Data> {
  code: number // Mostly http status code like.
  data: Data // If there's no data to send, please send null.
  message: string
}
