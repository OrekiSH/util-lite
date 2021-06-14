import { strictEqual } from "assert";
import { kebabcase } from "../index";

describe('kebabcase', () => {
  it('should works just like lodash', () => {
    strictEqual(kebabcase('Foo Bar'), 'foo-bar');
    strictEqual(kebabcase('fooBar'), 'foo-bar');
    strictEqual(kebabcase('__FOO_BAR__'), 'foo-bar');
    strictEqual(kebabcase('ABC_123'), 'abc-123');
    strictEqual(kebabcase('@#$%-_ABC_123'), 'abc-123');
    strictEqual(kebabcase('@#$%-汉字_ABC_123'), '汉字-abc-123');
  });
});