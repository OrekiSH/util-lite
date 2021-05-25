export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

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
