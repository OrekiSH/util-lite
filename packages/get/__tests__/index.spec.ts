import { deepStrictEqual, strictEqual } from 'assert';
import { get } from '../index';

describe('it', () => {
  it('should works like lodash', () => {
    const obj = { a: 1, b: { c: 2 } };
    strictEqual(get(obj, 'a'), 1);
    strictEqual(get(obj, ['a']), 1);
    strictEqual(get(obj, 'b.c'), 2);
    strictEqual(get(obj, ['b', 'c']), 2);
  });

  it('should preserve the sign of `0`', () => {
    const object = { '-0': 'a', '0': 'b' };
    const props = [-0, Object(-0), 0, Object(0)];

    deepStrictEqual(props.map((path) => get(object, path)), ['a', 'a', 'b', 'b']);
  });

  it('should handle falsy value', () => {
    const obj = {
      0: 1,
      false: 2,
      '': 3,
      null: 4,
      undefined: 5,
      NaN: 6,
    };

    strictEqual(get(obj, 0), 1);
    strictEqual(get(obj, 'false'), 2);
    strictEqual(get(obj, ''), 3);
    strictEqual(get(obj, 'null'), 4);
    strictEqual(get(obj, 'undefined'), 5);
    strictEqual(get(obj, 'NaN'), 6);
  });

  it('should handle decimal', () => {
    const obj = { '0.01': [], '0.02': { '0.03': null } };
    deepStrictEqual(get(obj, '0.01'), []);
    strictEqual(get(obj, ['0.02', '0.03']), null);

    deepStrictEqual(get(obj, '0.01', 'x'), []);
    strictEqual(get(obj, '0.07', 'x'), 'x');
    strictEqual(get(obj, ['0.02', '0.03'], undefined), null);
    strictEqual(get(obj, ['0.02', '0.04'], undefined), undefined);
    strictEqual(get(obj, ['0.02', '0.03'], false), null);
    strictEqual(get(obj, ['0.02', '0.04'], false), false);
    deepStrictEqual(get(obj, ['0.02', '0.04'], []), []);
  });

  it('should not coerce array paths to strings', () => {
    const object = { 'a,b,c': 3, 'a': { 'b': { 'c': 4 } } };
    strictEqual(get(object, ['a', 'b', 'c']), 4);
    strictEqual(get(object, 'a,b,c'), 3);
  });

  it('should array path not ignore empty brackets', () => {
    const object = { 'a': { '': 1 } };
    strictEqual(get(object, ['a', '']), 1);
    strictEqual(get({ '': 3 }, ['']), 3);
  });

  it('should handle empty paths', function() {
    strictEqual(get({}, ''), undefined);
    strictEqual(get({ '': 3 }, ''), 3);
  });

  it('should handle complex paths', function() {
    const object = { 'a': { '-1.23': { '["b"]': { 'c': { "['d']": { '\ne\n': { 'f': { 'g': 8 } } } } } } } };

    strictEqual(get(object, ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g']), 8);
  });
});