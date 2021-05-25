export function throttle(fn, wait, options) {
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function');
  }

  var leading = typeof (options === null || options === void 0 ? void 0 : options.leading) === 'undefined' ? true : !!options.leading;
  var trailing = typeof (options === null || options === void 0 ? void 0 : options.trailing) === 'undefined' ? true : !!options.trailing;
  var result;
  var lastInvokeTime = 0;
  var timerId = null;
  var invokeTimes = 0;

  var getRemainingWait = function getRemainingWait() {
    return +wait - (Date.now() - lastInvokeTime);
  };

  function throttled() {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // timestamp
    if (getRemainingWait() <= 0) {
      if (!leading && !timerId) {//
      } else {
        result = fn.apply(this, args);
      }

      lastInvokeTime = Date.now();
    } // debounce


    if (trailing) {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(function () {
        // invoke once
        if (leading && invokeTimes > 1 || !leading) {
          result = fn.apply(_this, args);
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