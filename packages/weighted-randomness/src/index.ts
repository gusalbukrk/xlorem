import { freqMapType } from '@xlorem/common/src/types';
import { getRandomArrayElement } from '@xlorem/common/src/utils';

import getFreqMapRandomTier from './getFreqMapRandomTier';
import getWeightsAndRangesFromFreqMap from './getWeightsAndRangesFromFreqMap';

/** Generate a weighted random function from `freqMap`. */
function weightedRandomness(freqMap: freqMapType): () => string {
  const [weights, ranges] = getWeightsAndRangesFromFreqMap(freqMap);

  const getRandomFreqMapValue: () => string = () =>
    getRandomArrayElement(getFreqMapRandomTier(freqMap, weights, ranges));

  return getRandomFreqMapValue;
}

export default weightedRandomness;
