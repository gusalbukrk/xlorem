import { notEnoughKeywords } from '@xlorem/common/src/errorMessages';
import { freqMapType } from '@xlorem/common/src/types';

import emphasize from './emphasize';
import generateFreqMapWeightAsKey from './generateFreqMapWeightAsKey';
import generateFreqMapWordAsKey from './generateFreqMapWordAsKey';
import isFreqMapTooShort from './isFreqMapTooShort';
import shortenFreqMap from './shortenFreqMap';

/**
 * @property emphasizeBy `wordsToEmphasize` will have their weight multiplied by this number.
 * @property wordsQuantityMin Returned freqMap should have at least this quantity of words.
 * @property tierValueMin Returned freqMap won't have any tier which value is less than this number.
 */
type optionsType = {
  emphasizeBy: number;
  wordsQuantityMin: number;
  tierValueMin: number;
};

const optionsDefault: optionsType = {
  emphasizeBy: 2, // double weight of any word in `wordsToEmphasize`
  wordsQuantityMin: 0, // don't throw error even if freqMap doesn't contain any word
  tierValueMin: 1, // don't filter out any tier
};

function generateFreqMap(
  wordsArray: string[],
  wordsToEmphasize?: string[],
  optionsArg?: Partial<optionsType>
): freqMapType {
  const options = { ...optionsDefault, ...optionsArg };

  const freqMapWordAsKey = emphasize(
    generateFreqMapWordAsKey(wordsArray),
    wordsToEmphasize || [],
    options.emphasizeBy
  );
  const freqMapWeightAsKey = generateFreqMapWeightAsKey(freqMapWordAsKey);
  const freqMapShortened = shortenFreqMap(freqMapWeightAsKey, options.tierValueMin);

  if (isFreqMapTooShort(freqMapShortened, options.wordsQuantityMin))
    throw new Error(notEnoughKeywords);

  return freqMapShortened;
}

export default generateFreqMap;
