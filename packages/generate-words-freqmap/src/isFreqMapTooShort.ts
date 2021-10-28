import { freqMapType } from '@xlorem/common/src/types';

function isFreqMapTooShort(
  freqMap: freqMapType,
  wordsQuantityMin: number
): boolean {
  const wordsQuantity = Object.values(freqMap).reduce(
    (acc, cur) => acc + cur.length,
    0
  );

  return wordsQuantity < wordsQuantityMin;
}

export default isFreqMapTooShort;
