export function debounce(fn, wait) {
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function');
  }

  var result;
  var timerId = null;

  function debounced() {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(function () {
      result = fn.apply(_this, args);
    }, +wait);
    return result;
  }

  return debounced;
}