import CustomError from '@xlorem/common/src/CustomError';
import { breakdownDefault } from '@xlorem/common/src/constants';
import { wordsQuantityDoesNotMatchBreakdown } from '@xlorem/common/src/errorMessages';
import {
  freqMapType,
  unitType,
  formatType,
  breakdownType,
} from '@xlorem/common/src/types';

import distribute from './distribute';
import generateTextArray from './generateTextArray';
import stringifyTextArray from './stringifyTextArray';

type optionsType = {
  unit: unitType;
  quantity: number;
  format: formatType;
  breakdown: breakdownType;
};

function getOptionsDefault(unit: unitType = 'paragraphs'): optionsType {
  return {
    unit,

    // default for 'paragraphs' is 5 and for 'words' 200.
    // if neither is supplied, defaults to 5 paragraphs.
    quantity: unit === 'paragraphs' ? 5 : 200,

    format: 'plain',
    breakdown: breakdownDefault,
  };
}

/**
 * Randomly generate text using given `freqMap`.
 * @param freqMap Frequency map.
 * @param options Miscellaneous options. See more at {@link optionsType}.
 * @param stringify If true, return string. Otherwise, return array.
 * @returns Random text.
 */
function generateText(
  freqMap: freqMapType,
  options: Partial<optionsType>,
  stringify = true
): string | string[][][] {
  const { unit, quantity, format, breakdown } = {
    ...getOptionsDefault(options.unit),
    ...options,
  };

  const wordsPerParagraphMin =
    breakdown.wordsPerSentenceMin * breakdown.sentencesPerParagraphMin;

  if (unit === 'words' && quantity < wordsPerParagraphMin) {
    throw new CustomError(
      wordsQuantityDoesNotMatchBreakdown(quantity, wordsPerParagraphMin),
      'generate-random-text'
    );
  }

  const distribution = distribute(quantity, unit, breakdown);

  const textArray = generateTextArray(freqMap, distribution);

  return stringify ? stringifyTextArray(textArray, format) : textArray;
}

export default generateText;
