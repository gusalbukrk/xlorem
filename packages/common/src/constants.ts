import { requirementsType } from './types.js';

/* eslint-disable import/prefer-default-export */

/*
  max must be at least `min * 2 - 1`
  otherwise, min & max couldn't be used to break down any number inside range `max to (min * 2)`

  e.g. if min is 7, max can't be anything less than 13
    - range 7 - 12 = couldn't break down 13
    - range 7 - 11 = couldn't break down 12, 13
    - range 7 - 10 = couldn't break down 11, 12, 13
    - so on...
 */
export const requirementsDefault: requirementsType = {
  sentencesPerParagraphMin: 4,
  sentencesPerParagraphMax: 8, // max must be at least min * 2 - 1
  wordsPerSentenceMin: 7,
  wordsPerSentenceMax: 13, // max must be at least min * 2 - 1
};

/* eslint-enable import/prefer-default-export */
