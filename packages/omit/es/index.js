export function omit(obj, keys) {
  var acc = {};
  var objKeys = Object.keys(obj);

  for (var i = 0; i < objKeys.length; i += 1) {
    var key = objKeys[i];

    if (keys.indexOf(key) === -1) {
      acc[key] = obj[key];
    }
  }

  return acc;
}