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
      'The quux. on .NET foo.\nFoo, which qux, and quux. or foobar.By - G. A. (example.com)'
    );

    expect(x).toStrictEqual([
      'quux.',
      'NET',
      'foo',
      'foo',
      'qux',
      'quux.',
      'foobar',
      'G.A.',
      'example.com',
    ]);
  });
});
