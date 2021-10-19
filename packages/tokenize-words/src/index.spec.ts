import { notEnoughKeywords } from '@xlorem/common/src/errorMessages';

import tokenizeWordsBase from '.';

const tokenizeWords = (str: string) => tokenizeWordsBase(str, true);

describe('tokenizeWords (main function)', () => {
  it('filter out words not containing alphanumeric character(s)', () => {
    expect.assertions(1);

    const a = tokenizeWords(`%$.-' *!@ ?..=`);
    expect(a).toStrictEqual([]);
  });

  it('throw error `not-enough-keywords`', () => {
    expect.assertions(1);

    expect(() => tokenizeWordsBase('')).toThrow(notEnoughKeywords);
  });
});
