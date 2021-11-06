import { notEnoughWordsInFreqMap } from '@xlorem/common/src/errorMessages';
import { freqMapType } from '@xlorem/common/src/types';

import emphasize from './emphasize';
import generateFreqMapWeightAsKey from './generateFreqMapWeightAsKey';
import generateFreqMapWordAsKey from './generateFreqMapWordAsKey';
import getFreqMapWordsQuantity from './getFreqMapWordsQuantity';
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

/**
 * Generate `freqMap` from `wordsArray`.
 * @param wordsArray
 * @param wordsToEmphasize Subset of `wordsArray` to emphasize.
 * @param optionsArg Miscellaneous options. See more at {@link optionsType}.
 * @throws Error if `freqMap` has less words than expected.
 * @returns freqMap.
 */
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

  const freqMap = shortenFreqMap(
    generateFreqMapWeightAsKey(freqMapWordAsKey),
    options.tierWeightMin,
    options.tierWeightMax,
    options.mergePosteriorTiersAt
  );

  const freqMapWordsQuantity = getFreqMapWordsQuantity(freqMap);

  if (freqMapWordsQuantity < options.wordsQuantityMin) {
    throw new Error(
      notEnoughWordsInFreqMap(options.wordsQuantityMin, freqMapWordsQuantity)
    );
  }

  return freqMap;
}

export default generateFreqMap;
