import getErrorMessage from '@xlorem/common/src/getErrorMessage';

import tokenizeWordsBase from '../../tokenize-words/src';
import generateFreqMapBase from '../src';

const generateFreqMap = (words: string[]) =>
  generateFreqMapBase(words, [], 0, true);
const tokenizeWords = (str: string) => tokenizeWordsBase(str, true);

describe('generateFreqMap', () => {
  it('freqMap is generated correctly', () => {
    expect.assertions(1);

    const text = `Foo bar (foo), baz bar foo. ${Array.from({
      length: 25,
    })
      .fill('qux')
      .join(' ')}`;

    const x = generateFreqMap(tokenizeWords(text) || []);
    expect(x).toStrictEqual({ 3: ['foo'], 20: ['qux'] });
  });
});

describe('throw error message correctly', () => {
  it('not-enough-keywords', () => {
    expect.assertions(1);

    expect(() => generateFreqMapBase([], [], 13)).toThrow(
      getErrorMessage('not-enough-keywords')
    );
  });
});
