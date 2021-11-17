import { freqMapType } from '@xlorem/common/src/types';
import { last } from '@xlorem/common/src/utils';

/** e.g.: `{ 1: [...], 2: [...], 3: [...] }` => `[ [1, 2, 3], [1, 3, 6] ]` */
function getWeightsAndRangesFromFreqMap(freqMap: freqMapType): number[][] {
  // Object.keys will always return integer indices first and in ascending order
  // https://2ality.com/2015/10/property-traversal-order-es6.html#integer-indices

  const weights = Object.keys(freqMap).map((weight) => Number(weight));

  const ranges = weights.reduce<number[]>(
    (acc, weight) => acc.concat((last(acc) || 0) + weight),
    []
  );

  return [weights, ranges];
}

export default getWeightsAndRangesFromFreqMap;
