import { strictEqual } from "assert";
import { kebabCase } from "../index";

describe('kebabCase', () => {
  it('should works just like lodash', () => {
    strictEqual(kebabCase('Foo Bar'), 'foo-bar');
    strictEqual(kebabCase('fooBar'), 'foo-bar');
    strictEqual(kebabCase('__FOO_BAR__'), 'foo-bar');
    strictEqual(kebabCase('ABC_123'), 'abc-123');
    strictEqual(kebabCase('@#$%-_ABC_123'), 'abc-123');
    strictEqual(kebabCase('@#$%-汉字_ABC_123'), '汉字-abc-123');
  });
});