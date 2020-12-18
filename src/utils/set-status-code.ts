// If some codes're > 1000, use it.
export const setStatusCode = (code: number): number =>
  code < 1000 ? code : Math.floor(code / 1000)

