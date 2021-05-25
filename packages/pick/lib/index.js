"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pick = pick;

function pick(obj, keys, ignoreUndefined) {
  var acc = {};

  for (var i = 0; i < keys.length; i += 1) {
    var key = keys[i];

    if (!ignoreUndefined || typeof obj[key] !== 'undefined') {
      acc[key] = obj[key];
    }
  }

  return acc;
}