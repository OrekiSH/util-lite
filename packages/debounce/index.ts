/**
 * Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since
 * the last time the debounced function was invoked. The debounced function comes with a cancel method to
 * cancel delayed invocations and a flush method to immediately invoke them. Provide an options object to
 * indicate that fn should be invoked on the leading and/or trailing edge of the wait timeout. Subsequent
 * calls to the debounced function return the result of the last fn invocation.
 *
 * Note: If leading and trailing options are true, fn is invoked on the trailing edge of the timeout only
 * if the the debounced function is invoked more than once during the wait timeout.
 *
 * @param fn The function to debounce.
 * @param wait The number of milliseconds to delay.
 * @param options The options object.
 * @param options.leading Specify invoking on the leading edge of the timeout.
 * @param options.trailing Specify invoking on the trailing edge of the timeout.
 * @return Returns the new debounced function.
 */
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
