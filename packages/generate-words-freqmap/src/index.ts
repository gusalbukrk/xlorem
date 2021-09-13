import { notEnoughKeywords } from '@xlorem/common/src/errorMessages';
import { freqMapType } from '@xlorem/common/src/types';

import emphasize from './emphasize';
import generateFreqMapWeightAsKey from './generateFreqMapWeightAsKey';
import generateFreqMapWordAsKey from './generateFreqMapWordAsKey';
import shortenFreqMap from './shortenFreqMap';

function isFreqMapTooShort(freqMap: freqMapType, wordsPerSentenceMax: number) {
  const wordsQuantity = Object.values(freqMap).reduce(
    (acc, cur) => acc + cur.length,
    0
  );

  // divide by 4 because at least 1 in 4 words will be stopwords
  const wordsQuantityMinRequired =
    wordsPerSentenceMax - Math.floor(wordsPerSentenceMax / 4);

  return wordsQuantity < wordsQuantityMinRequired;
}

function generateFreqMap(
  wordsArray: string[],
  wordsToEmphasize: string[],
  wordsPerSentenceMax: number,
  isTest = false
): freqMapType {
  const freqMapWordAsKey = generateFreqMapWordAsKey(wordsArray);
  const freqMapEmphasized = emphasize(freqMapWordAsKey, wordsToEmphasize);
  const freqMapWeightAsKey = generateFreqMapWeightAsKey(freqMapEmphasized);
  const freqMapShortened = shortenFreqMap(freqMapWeightAsKey);

  if (!isTest && isFreqMapTooShort(freqMapShortened, wordsPerSentenceMax)) {
    throw new Error(notEnoughKeywords);
  }

  return freqMapShortened;
}

export default generateFreqMap;
