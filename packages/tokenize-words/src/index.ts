import { notEnoughWordsInWordsArray } from '@xlorem/common/src/errorMessages';

import normalizeText from './normalizeText';

type optionsType = {
  lengthMin: number;
};

const optionsDefault: optionsType = {
  lengthMin: 0, // don't error even if return array is empty
};

/**
 * Break down text string into array of words.
 * @param text
 * @param optionsArg Miscellaneous options.
 * @throws Error if `wordsArray` length is less than `options.lengthMin`.
 * @returns Array of words.
 */
function tokenizeWords(text: string, optionsArg?: optionsType): string[] {
  const options = { ...optionsDefault, ...optionsArg };

  const wordsArray = normalizeText(text).match(/\S+/g) || [];

  const wordsArrayLength = wordsArray.length;

  if (wordsArrayLength < options.lengthMin) {
    throw new Error(
      notEnoughWordsInWordsArray(options.lengthMin, wordsArrayLength)
    );
  }

  return wordsArray;
}

export default tokenizeWords;
