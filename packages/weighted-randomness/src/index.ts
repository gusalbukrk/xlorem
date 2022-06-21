import { freqMapType } from 'xlorem-common/types';
import { getRandomArrayElement } from 'xlorem-common/utils';

import getFreqMapRandomTier from './getFreqMapRandomTier.js';
import getWeightsAndRangesFromFreqMap from './getWeightsAndRangesFromFreqMap.js';

/** Generate a weighted random function from `freqMap`. */
function weightedRandomness(freqMap: freqMapType): () => string {
  const [weights, ranges] = getWeightsAndRangesFromFreqMap(freqMap);

  const getRandomFreqMapValue: () => string = () =>
    getRandomArrayElement(getFreqMapRandomTier(freqMap, weights, ranges));

  return getRandomFreqMapValue;
}

export default weightedRandomness;
