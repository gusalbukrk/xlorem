import { breakdownDefault } from '@xlorem/common/src/constants';
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

/**
 * Default for 'paragraphs' is 5 and for 'words' 200.
 * If neither is supplied, defaults to 5 paragraphs.
 */
function getOptionsDefault(unit: unitType = 'paragraphs'): optionsType {
  return {
    unit,
    quantity: unit === 'paragraphs' ? 5 : 200,
    format: 'plain',
    breakdown: breakdownDefault,
  };
}

function generateText(
  freqMap: freqMapType,
  options: Partial<optionsType>,
  isTest = false
): string | string[][][] {
  const { unit, quantity, format, breakdown } = {
    ...getOptionsDefault(options.unit),
    ...options,
  };

  const wordsDistribution = distributeWords(unit, quantity, breakdown);

  const textArray = generateTextArray(freqMap, wordsDistribution);

  return isTest ? textArray : stringifyTextArray(textArray, format);
}

export default generateText;
