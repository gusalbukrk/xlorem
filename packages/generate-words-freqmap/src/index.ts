import { notEnoughKeywords } from '@xlorem/common/src/errorMessages';
import { freqMapType } from '@xlorem/common/src/types';

import emphasize from './emphasize';
import generateFreqMapWeightAsKey from './generateFreqMapWeightAsKey';
import generateFreqMapWordAsKey from './generateFreqMapWordAsKey';
import isFreqMapTooShort from './isFreqMapTooShort';
import shortenFreqMap from './shortenFreqMap';

/**
 * @property emphasizeBy `wordsToEmphasize` will have their weight multiplied by this number.
 * @property wordsQuantityMin Return should have at least this quantity of words, otherwise error.
 * @property tierWeightMin Filter out from return any tier which weight is less than this number.
 * @property tierWeightMax Filter out from return any tier which weight is more than this number.
 * @property mergePosteriorTiersAt Merge at this tier all posterior tiers (tiers w/ higher weight).
 */
type optionsType = {
  emphasizeBy: number;
  wordsQuantityMin: number;
  tierWeightMin: number;
  tierWeightMax: number;
  mergePosteriorTiersAt: number;
};

const optionsDefault: optionsType = {
  emphasizeBy: 2, // double weight of any word in `wordsToEmphasize`
  wordsQuantityMin: 0, // don't throw error even if freqMap doesn't contain any word
  tierWeightMin: 1, // don't filter out any tier
  tierWeightMax: -1, // disable option
  mergePosteriorTiersAt: -1, // disable option
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

  const freqMapShortened = shortenFreqMap(
    freqMapWeightAsKey,
    options.tierWeightMin,
    options.tierWeightMax,
    options.mergePosteriorTiersAt
  );

  if (isFreqMapTooShort(freqMapShortened, options.wordsQuantityMin))
    throw new Error(notEnoughKeywords);

  return freqMapShortened;
}

export default generateFreqMap;
