export function debounce(fn: Function, wait: number | string) {
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function');
  }
  let result: unknown;
  let timerId: ReturnType<typeof setTimeout> | null = null;

  function debounced(...args: unknown[]) {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      result = fn.apply(this, args);
    }, +wait);

    return result;
  }

  return debounced;
}
