import { notEnoughKeywords } from '@xlorem/common/src/errorMessages';

import normalizeText from './normalizeText';

/**
 * Break down text string into array of words.
 * @param text
 * @throws Error if tokenization results in an empty array.
 * @returns Array of words.
 */
function tokenizeWords(text: string): string[] {
  const wordsArray = normalizeText(text).match(/\S+/g) || [];

  if (wordsArray.length === 0) throw new Error(notEnoughKeywords());

  return wordsArray;
}

export default tokenizeWords;
