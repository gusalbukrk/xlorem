import { freqMapType } from '@xlorem/common/src/types';
import { last, getRandomNumber } from '@xlorem/common/src/utils';

import getRangeRespectiveFreqMapWeight from './getRangeRespectiveFreqMapWeight';

function getFreqMapRandomTier(
  freqMap: freqMapType,
  weights: number[],
  ranges: number[]
): string[] {
  const range = getRandomNumber(1, last(ranges));
  const weight = getRangeRespectiveFreqMapWeight(range, weights, ranges);
  const tier = freqMap[weight];

  return tier;
}

export default getFreqMapRandomTier;
