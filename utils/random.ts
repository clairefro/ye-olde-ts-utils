/** Returns true with probability between 0-1. Defaults to 50% probability true. */
export const randomBool = (probabilityTrue = 0.5): boolean => {
  let probTrue = probabilityTrue
  if(probabilityTrue > 1) probTrue = 1
  if(probabilityTrue < 0) probTrue = 0
  return Math.random() < probTrue
}

/** Returns a random integer between min and max (inclusive) */
export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/** Plucks a random item from an array */
export const pluck= <T>(arr: T[]): T => {
  const i = randomInt(0, arr.length - 1)
  return arr[i]
}