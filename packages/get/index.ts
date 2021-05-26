const toString = (n: number | string) => (Object.is(-0, +n) ? '-0' : `${n}`);

/**
 * Gets the property value at path of object. If the resolved value is undefined the defaultValue is used
 * in its place.
 *
 * Note: If use string path, empty path will by ignored
 * eg. you should use `['a', ''] rather than `a[]`.
 *
 * @param obj The object to query.
 * @param path The path of the property to get.
 * @param defaultValue The value returned if the resolved value is undefined.
 * @return Returns the resolved value.
 */
export function get<T, U extends keyof T>(
  obj: T,
  path: U | string | ReadonlyArray<U | string>,
  defaultValue?: unknown,
) {
  let tokens: string[] = [];
  // get a key over a path
  const key = toString(path as string) as U;

  if (Array.isArray(path)) {
    tokens = path;
  } else if (key in obj) {
    return obj[key];
  } else if (typeof path === 'string') {
    if (path === '') return undefined;
    tokens = (path.match(/([^[.\]])+/g) || []) as string[];
  }

  for (let i = 0; i < tokens.length; i += 1) {
    const token = toString(tokens[i]) as keyof T;
    // @ts-ignore
    // eslint-disable-next-line
    obj = obj?.[token];

    if (typeof obj === 'undefined') break;
  }

  return typeof obj === 'undefined' ? defaultValue : obj;
}
