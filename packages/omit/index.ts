export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
/**
 * The opposite of `pick`; this method creates an object composed of the
 * own and inherited enumerable properties of `object` that are not omitted.
 *
 * @param obj The source object.
 * @param keys The property names to omit, specified
 *  individually or in arrays..
 * @returns Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
export function omit<T, U extends keyof T>(
  obj: T,
  keys: ReadonlyArray<U>,
) {
  const acc = {} as Writeable<Omit<T, U>>;
  const objKeys = Object.keys(obj) as (keyof T)[];

  for (let i = 0; i < objKeys.length; i += 1) {
    const key = objKeys[i] as (Exclude<keyof T, U> & U);
    if (keys.indexOf(key) === -1) {
      acc[key] = obj[key];
    }
  }

  return acc;
}
