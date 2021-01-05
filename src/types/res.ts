export interface Res<Data = null> {
  code: number
  data?: Data
  headers?: { [key: string]: string }
}
