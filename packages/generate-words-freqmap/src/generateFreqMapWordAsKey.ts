import { freqMapWordAsKeyType } from './common/types';

/** **freqMapWordAsKey** example: `{ foo: 1, bar: 3 }` */
function generateFreqMapWordAsKey(wordsArray: string[]): freqMapWordAsKeyType {
  return wordsArray.reduce(
    (freqMap, word) => ({
      ...freqMap,

      // using hasOwnProperty instead of check if undefined, otherwise
      // if `word` is a built-in object property (e.g. `constructor`)
      // would append 1 to this property (which would results in `NaN`)
      // instead of creating a new property
      [word]: Object.prototype.hasOwnProperty.call(freqMap, word)
        ? freqMap[word] + 1
        : 1,
    }),
    {} as freqMapWordAsKeyType
  );
}

export default generateFreqMapWordAsKey;
