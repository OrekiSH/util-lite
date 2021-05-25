import { deepStrictEqual } from 'assert';
import { pick } from '../index';

describe('pick', () => {
  const object = {
    a: 1, b: 2, c: 3, d: undefined, e: null,
  };

  it('should works', () => {
    deepStrictEqual(pick(object, ['a', 'b']), { a: 1, b: 2 });
  });

  it('should works when undefined', () => {
    deepStrictEqual(pick(object, ['a', 'd']), { a: 1, d: undefined });
    deepStrictEqual(pick(object, ['a', 'd'], true), { a: 1 });

    deepStrictEqual(pick(object, ['a', 'e']), { a: 1, e: null });
    deepStrictEqual(pick(object, ['a', 'e'], true), { a: 1, e: null });
  });
});
