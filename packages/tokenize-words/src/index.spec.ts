import tokenizeWords from './index.js';

describe('tokenizeWords (main function)', () => {
  it('`notEnoughWordsInWordsArray` error', () => {
    expect.assertions(1);

    const a = () => tokenizeWords('', { lengthMin: 1 });
    expect(a).toThrow(
      "Given `text` doesn't have enough keywords to construct `wordsArray` containing the minimum quantity of words required."
    );
  });

  it('integration test', () => {
    expect.assertions(1);

    const a = tokenizeWords(
      "The foo, baz. and bar.\nFoo is on baz. and qux.Foo 7.5% isn't .foobar! - G. A. (example.com)"
    );

    expect(a).toStrictEqual([
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
