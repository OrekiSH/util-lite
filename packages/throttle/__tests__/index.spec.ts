import {
  strictEqual, throws, ok, deepStrictEqual, notStrictEqual,
} from 'assert';
import { throttle } from '../index';

const identity = (e: unknown) => e;

describe('throttle', () => {
  it('should works just like lodash', (done) => {
    let callCount = 0;
    const throttled = throttle(() => { callCount++; }, 32);

    throttled();
    throttled();
    throttled();

    const lastCount = callCount;
    ok(callCount);

    setTimeout(() => {
      ok(callCount > lastCount);
      done();
    }, 64);
  });

  it('should throw error', () => {
    throws(() => throttle(1, 1), {
      name: 'TypeError',
      message: 'Expected a function',
    });
  });

  it('should not trigger a trailing call when invoked once', (done) => {
    let callCount = 0;
    const throttled = throttle(() => { callCount++; }, 32);

    throttled();
    strictEqual(callCount, 1);

    setTimeout(() => {
      strictEqual(callCount, 1);
      done();
    }, 64);
  });

  it('should not update `lastCalled`, at the end of the timeout, when `trailing` is `false`', (done) => {
    let callCount = 0;

    const throttled = throttle(() => {
      callCount++;
    }, 64, { trailing: false });

    throttled();
    throttled();

    setTimeout(() => {
      throttled();
      throttled();
    }, 96);

    setTimeout(() => {
      ok(callCount > 1);
      done();
    }, 192);
  });

  it('should trigger a second throttled call as soon as possible', (done) => {
    let callCount = 0;

    const throttled = throttle(() => {
      callCount++;
    }, 128, { leading: false });

    throttled();

    setTimeout(() => {
      strictEqual(callCount, 1);
      throttled();
    }, 192);

    setTimeout(() => {
      strictEqual(callCount, 1);
    }, 254);

    setTimeout(() => {
      strictEqual(callCount, 2);
      done();
    }, 384);
  });

  it('subsequent calls should return the result of the first call', (done) => {
    const throttled = throttle(identity, 32);
    const results = [throttled('a'), throttled('b')];

    deepStrictEqual(results, ['a', 'a']);

    setTimeout(() => {
      const results = [throttled('c'), throttled('d')];
      notStrictEqual(results[0], 'a');
      notStrictEqual(results[0], undefined);

      notStrictEqual(results[1], 'd');
      notStrictEqual(results[1], undefined);
      done();
    }, 64);
  });
});
