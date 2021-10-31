import { freqMapWordAsKeyType } from './common/types';

/** **freqMapWordAsKey** example: `{ foo: 1, bar: 3 }` */
function generateFreqMapWordAsKey(wordsArray: string[]): freqMapWordAsKeyType {
  const freqMap: freqMapWordAsKeyType = {};

  /* eslint-disable no-prototype-builtins */
  wordsArray.forEach((word: string) => {
    // use hasOwnProperty instead of check if undefined, otherwise
    // if `word` is a built-in object property (e.g. `constructor`)
    // would append 1 to this property, instead of create a new property
    freqMap[word] = freqMap.hasOwnProperty(word) ? freqMap[word] + 1 : 1;
  });
  /* eslint-enable no-prototype-builtins */

  return freqMap;
}

export default generateFreqMapWordAsKey;
