import { freqMapType } from '@xlorem/common/src/types';

import { freqMapWordAsKeyType } from './common/types';

/** **freqMapWeightAsKey** example: `{ 1: ['foo', 'bar'], 3: ['baz'] }` */
function generateFreqMapWeightAsKey(
  freqMapWordAsKey: freqMapWordAsKeyType
): freqMapType {
  const freqMap: freqMapType = {};

  Object.keys(freqMapWordAsKey).forEach((word) => {
    const weight = freqMapWordAsKey[word];

    if (freqMap[weight] === undefined) freqMap[weight] = [];

    freqMap[weight].push(word);
  });

  return freqMap;
}

export default generateFreqMapWeightAsKey;
