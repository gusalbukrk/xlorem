import { freqMapWordAsKeyType } from './types';

function emphasize(
  freqMapWordAsKey: freqMapWordAsKeyType,
  wordsToEmphasize: string[]
): freqMapWordAsKeyType {
  const freqMap = { ...freqMapWordAsKey };

  Object.keys(freqMap).forEach((word) => {
    if (wordsToEmphasize.includes(word)) freqMap[word] *= 2;
  });

  return freqMap;
}

export default emphasize;
