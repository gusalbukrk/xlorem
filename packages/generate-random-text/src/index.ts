import CustomError from '@xlorem/common/src/CustomError';
import { breakdownDefault } from '@xlorem/common/src/constants';
import { wordsQuantityDoesNotMatchBreakdown } from '@xlorem/common/src/errorMessages';
import {
  freqMapType,
  unitType,
  formatType,
  breakdownType,
} from '@xlorem/common/src/types';

import distributeWords from './distributeWords';
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

function generateText(
  freqMap: freqMapType,
  options: Partial<optionsType>,
  stringify = true
): string | string[][][] {
  const { unit, quantity, format, breakdown } = {
    ...getOptionsDefault(options.unit),
    ...options,
  };

  if (
    unit === 'words' &&
    quantity <
      breakdown.wordsPerSentenceMin * breakdown.sentencesPerParagraphMin
  ) {
    throw new CustomError(
      wordsQuantityDoesNotMatchBreakdown(
        quantity,
        breakdown.wordsPerSentenceMin * breakdown.sentencesPerParagraphMin
      ),
      'generate-random-text'
    );
  }

  const wordsDistribution = distributeWords(unit, quantity, breakdown);
  console.warn(wordsDistribution);

  const textArray = generateTextArray(freqMap, wordsDistribution);

  return stringify ? stringifyTextArray(textArray, format) : textArray;
}

export default generateText;
