export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

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
