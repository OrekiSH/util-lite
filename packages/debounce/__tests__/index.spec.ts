import { strictEqual, throws, deepStrictEqual } from 'assert';
import { debounce } from '../index';

describe('debounce', () => {
  it('should works just like lodash', (done) => {
    let callCount = 0;

    const debounced = debounce((value) => {
      ++callCount;
      return value;
    }, 32);

    const results = [debounced('a'), debounced('b'), debounced('c')];
    deepStrictEqual(results, ([undefined, undefined, undefined]));
    strictEqual(callCount, 0);

    setTimeout(() => {
      strictEqual(callCount, 1);

      const results = [debounced('d'), debounced('e'), debounced('f')];
      deepStrictEqual(results, ['c', 'c', 'c']);
      strictEqual(callCount, 1);
    }, 128);

    setTimeout(() => {
      strictEqual(callCount, 2);
      done();
    }, 256);
  });

  it('should throw error', () => {
    throws(() => debounce(1, 1), {
      name: 'TypeError',
      message: 'Expected a function',
    });
  });

  it('should not immediately call `func` when `wait` is `0`', (done) => {
    let callCount = 0;
    const debounced = debounce(() => { ++callCount; }, 0);

    debounced();
    debounced();
    strictEqual(callCount, 0);

    setTimeout(() => {
      strictEqual(callCount, 1);
      done();
    }, 5);
  });
});
