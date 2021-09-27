import { notEnoughKeywords } from '@xlorem/common/src/errorMessages';

import normalizeText from './normalizeText';

/**
 * Break down text string into array of words.
 * @param text
 * @param isTest If true, doesn't error when return is empty. Defaults to false.
 * @returns Array of strings.
 */
function tokenizeWords(text: string, isTest = false): string[] {
  const wordsArray =
    normalizeText(text)
      .match(/\S+/g)
      ?.filter((word) => /\w/.test(word)) || []; // filterOutWordsNotContainingAlphanumericChars

  if (!isTest && wordsArray.length === 0) throw new Error(notEnoughKeywords);

  return wordsArray;
}

export default tokenizeWords;
