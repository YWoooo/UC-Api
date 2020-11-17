import { v4 as uuidv4 } from 'uuid';

export default class Entity {
  constructor(
    public id = uuidv4(),
    public createdTime = new Date().toISOString()
  ) { }
}
