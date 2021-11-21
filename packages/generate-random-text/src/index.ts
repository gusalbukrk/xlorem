import {
  freqMapType,
  unitType,
  formatType,
  breakdownType,
} from '@xlorem/common/src/types';

import distributeWords from './distributeWords';
import generateTextArray from './generateTextArray';
import stringifyTextArray from './stringifyTextArray';

function generateText(
  freqMap: freqMapType,
  unit: unitType,
  quantity: number,
  format: formatType,
  breakdown: breakdownType,
  isTest = false
): string | string[][][] {
  const wordsDistribution = distributeWords(unit, quantity, breakdown);

  const textArray = generateTextArray(freqMap, wordsDistribution);

  return isTest ? textArray : stringifyTextArray(textArray, format);
}

export default generateText;
