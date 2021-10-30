import tokenizeWords from '.';

describe('tokenizeWords (main function)', () => {
  it('throw error `not-enough-keywords`', () => {
    expect.assertions(1);

    expect(() => tokenizeWords('')).toThrow(
      "Text doesn't contain enough keywords (words that aren't stop words)."
    );
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
