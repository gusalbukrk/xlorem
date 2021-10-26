import { notEnoughKeywords } from '@xlorem/common/src/errorMessages';

import tokenizeWords from '.';

describe('tokenizeWords (main function)', () => {
  it('throw error `not-enough-keywords`', () => {
    expect.assertions(1);

    expect(() => tokenizeWords('')).toThrow(notEnoughKeywords);
  });

  it('integration test', () => {
    expect.assertions(1);

    const x = tokenizeWords(
      "The foo, baz. and bar.\nFoo is on baz. and qux.Foo 7.5% isn't .foobar! - G. A. (example.com)"
    );

    expect(x).toStrictEqual([
      'foo',
      'baz.',
      'bar',
      'foo',
      'baz.',
      'qux',
      'foo',
      '7.5%',
      'foobar',
      'G.A.',
      'example.com',
    ]);
  });
});
