import { breakdownType } from './types';

/* eslint-disable import/prefer-default-export */

export const breakdownDefault: breakdownType = {
  sentencesPerParagraphMin: 4,
  sentencesPerParagraphMax: 8, // max must be at least min * 2 - 1
  wordsPerSentenceMin: 7,
  wordsPerSentenceMax: 13, // max must be at least min * 2 - 1
};

/* eslint-enable import/prefer-default-export */
