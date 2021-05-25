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
