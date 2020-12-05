import pick from 'lodash.pick'
import isEqual from 'lodash.isequal'

/**
 * Given a array of keys and an object,
 * return an object with these keys, 
 * or null if one of keys cna't be found.
 * @generic {T} Type of returning object
 * @param {any} object 
 * @param {string[]} keys
 * @returns {T | null}
 */
export const objectMapping = <T>(object: any, keys: string[]): T | null => {
  const res = pick(object, keys)
  const isSuccess = isEqual(keys, Object.keys(res))
  return isSuccess ? res as T : null
}
