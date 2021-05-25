import { deepStrictEqual } from 'assert';
import { omit } from '../index';

describe('omit', () => {
  const object = {
    a: 1, b: 2, c: 3, d: undefined, e: null,
  };

  it('should works', () => {
    deepStrictEqual(omit(object, ['c', 'd']), { a: 1, b: 2, e: null });
  });
});
