export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @param obj The source object.
 * @param keys The property names to pick, specified
 *  individually or in arrays.
 * @param ignoreUndefined If pick undefined value.
 * @returns Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
export function pick<T, U extends keyof T>(
  obj: T,
  keys: ReadonlyArray<U>,
  ignoreUndefined?: boolean,
) {
  const acc = {} as Writeable<Pick<T, U>>;
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (!ignoreUndefined || typeof obj[key] !== 'undefined') {
      acc[key] = obj[key];
    }
  }

  return acc;
}
