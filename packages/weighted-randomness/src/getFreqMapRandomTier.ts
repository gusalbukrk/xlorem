import { freqMapType } from '@xlorem/common/src/types';
import { last, getRandomNumber } from '@xlorem/common/src/utils';

function getRangeRespectiveFreqMapWeight(
  range: number,
  ranges: number[],
  weights: number[]
): number {
  const index = ranges.findIndex((r) => r >= range);
  const weight = weights[index];

  return weight;
}

function getFreqMapRandomTier(
  freqMap: freqMapType,
  weights: number[],
  ranges: number[]
): string[] {
  const range = getRandomNumber(1, last(ranges));
  const weight = getRangeRespectiveFreqMapWeight(range, ranges, weights);
  const tier = freqMap[weight];

  return tier;
}

export { getRangeRespectiveFreqMapWeight }; // for testing purposes

export default getFreqMapRandomTier;
