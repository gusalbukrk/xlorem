import tokenizeWords from 'tokenize-words/src';

import generateFreqMap from '.';

describe('generateFreqMap', () => {
  // test function with no optional argument
  it('freqMap is generated correctly', () => {
    expect.assertions(1);

    const text = `Foo bar (foo), baz bar foo. ${Array.from({
      length: 25,
    })
      .fill('qux')
      .join(' ')}`;

    const x = generateFreqMap(tokenizeWords(text) || [], [], {
      tierWeightMin: 3,
      mergePosteriorTiersAt: 20,
    });
    expect(x).toStrictEqual({ 3: ['foo'], 20: ['qux'] });
  });

  // test every `options` argument
  // test default `options`
  // test options.emphasizeBy is decimal (not an integer)

  it('not-enough-keywords error', () => {
    expect.assertions(1);

    expect(() => generateFreqMap([], [], { wordsQuantityMin: 1 })).toThrow(
      "Text doesn't contain enough keywords (words that aren't stop words)."
    );
  });
});
