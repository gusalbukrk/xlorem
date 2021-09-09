import { freqMapType } from '@xlorem/common/src/types';

function shortenFreqMap(freqMap: freqMapType): freqMapType {
  const freqMapShorten: freqMapType = {};

  Object.keys(freqMap)
    .map((weight) => Number(weight))
    .forEach((weight) => {
      if (weight < 3) return;

      if (weight <= 20) {
        freqMapShorten[weight] = freqMap[weight];
      } else {
        freqMapShorten[20] = (freqMapShorten[20] || []).concat(freqMap[weight]);
      }
    });

  return freqMapShorten;
}

export default shortenFreqMap;
