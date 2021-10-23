import { notEnoughKeywords } from '@xlorem/common/src/errorMessages';

import tokenizeWords from '.';

describe('tokenizeWords (main function)', () => {
  it('throw error `not-enough-keywords`', () => {
    expect.assertions(1);

    expect(() => tokenizeWords('')).toThrow(notEnoughKeywords);
  });
});
