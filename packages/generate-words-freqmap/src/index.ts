import CustomError from 'xlorem-common/CustomError';
import { notEnoughWordsInFreqMap } from 'xlorem-common/errorMessages';
import { freqMapType } from 'xlorem-common/types';

import emphasize from './emphasize.js';
import generateFreqMapWeightAsKey from './generateFreqMapWeightAsKey.js';
import generateFreqMapWordAsKey from './generateFreqMapWordAsKey.js';
import getFreqMapWordsQuantity from './getFreqMapWordsQuantity.js';
import shortenFreqMap from './shortenFreqMap.js';

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
    throw new CustomError(
      notEnoughWordsInFreqMap(options.wordsQuantityMin, freqMapWordsQuantity),
      'generate-words-freqmap'
    );
  }

  return freqMap;
}

export default generateFreqMap;
