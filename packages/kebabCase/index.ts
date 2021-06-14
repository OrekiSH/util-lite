/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the kebab cased string.
 * @example
 *
 * kebabcase('Foo Bar')
 * // => 'foo-bar'
 *
 * kebabcase('fooBar')
 * // => 'foo-bar'
 *
 * kebabcase('__FOO_BAR__')
 * // => 'foo-bar'
 */
export function kebabcase(s: string) {
  return s.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    // eslint-disable-next-line
    .replace(/[!@#\$%\^\&*\)\(+=._]/g, '')
    .replace(/(^-+|-+$)/g, '')
    .toLowerCase();
}
