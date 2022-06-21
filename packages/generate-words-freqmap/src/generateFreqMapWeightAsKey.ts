import { freqMapType } from 'xlorem-common/types';

import { freqMapWordAsKeyType } from './common/types.js';

/** **freqMapWeightAsKey** example: `{ 1: ['foo', 'bar'], 3: ['baz'] }` */
function generateFreqMapWeightAsKey(
  freqMapWordAsKey: freqMapWordAsKeyType
): freqMapType {
  return Object.keys(freqMapWordAsKey).reduce((freqMap, word) => {
    const weight = freqMapWordAsKey[word];

    return { ...freqMap, [weight]: (freqMap[weight] || []).concat(word) };
  }, {} as freqMapType);
}

export default generateFreqMapWeightAsKey;
