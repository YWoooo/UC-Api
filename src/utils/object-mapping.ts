import pick from 'lodash.pick'
import isEqual from 'lodash.isequal'

/**
 * Given a array of keys and an object,
 * return an object with these keys, 
 * or null if one of keys cna't be found.
 * @param {any} object 
 * @param {string[]} keys
 * @returns {any} 
 */
export const objectMapping = (object: any, keys: string[]) => {
  const res = pick(object, keys)
  const isSuccess = isEqual(keys, Object.keys(res))
  return isSuccess ? res : null
}
