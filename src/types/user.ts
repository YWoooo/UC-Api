import Entity from './common/Entity'

export default class User extends Entity {
  constructor(
    public email: string,
    public password: string,
    public tradeAccs: string[] = []
  ) { super() }
}
