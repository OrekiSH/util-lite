/**
 * Creates a throttled function that only invokes fn at most once per every wait milliseconds. The throttled
 * function comes with a cancel method to cancel delayed invocations and a flush method to immediately invoke
 * them. Provide an options object to indicate that fn should be invoked on the leading and/or trailing edge
 * of the wait timeout. Subsequent calls to the throttled function return the result of the last fn call.
 *
 * Note: If leading and trailing options are true, fn is invoked on the trailing edge of the timeout only if
 * the the throttled function is invoked more than once during the wait timeout.
 *
 * @param fn The function to throttle.
 * @param wait The number of milliseconds to throttle invocations to.
 * @param options The options object.
 * @param options.leading Specify invoking on the leading edge of the timeout.
 * @param options.trailing Specify invoking on the trailing edge of the timeout.
 * @return Returns the new throttled function.
 */
export function throttle(
  fn: Function,
  wait: number | string,
  options?: {
    leading?: boolean;
    trailing?: boolean;
  },
) {
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function');
  }
  const leading = typeof options?.leading === 'undefined'
    ? true : !!options.leading;
  const trailing = typeof options?.trailing === 'undefined'
    ? true : !!options.trailing;

  let result: unknown;
  let lastInvokeTime: number = 0;
  let timerId: ReturnType<typeof setTimeout> | null = null;
  let invokeTimes = 0;

  const getRemainingWait = () => +wait - (Date.now() - lastInvokeTime);

  function throttled(...args: unknown[]) {
    // timestamp
    if (getRemainingWait() <= 0) {
      if (!leading && !timerId) {
        //
      } else {
        result = fn.apply(this, args);
      }

      lastInvokeTime = Date.now();
    }

    // debounce
    if (trailing) {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        // invoke once
        if ((leading && invokeTimes > 1) || !leading) {
          result = fn.apply(this, args);
          lastInvokeTime = Date.now();
        }
        timerId = null;
        invokeTimes = 0;
      }, getRemainingWait());
    }

    invokeTimes += 1;

    return result;
  }

  return throttled;
}
