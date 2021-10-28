import { freqMapWordAsKeyType } from './common/types';

function emphasize(
  freqMapWordAsKey: freqMapWordAsKeyType,
  wordsToEmphasize: string[],
  emphasizeBy: number,
): freqMapWordAsKeyType {
  const freqMap = { ...freqMapWordAsKey };

  Object.keys(freqMap).forEach((word) => {
    if (wordsToEmphasize.includes(word)) Math.round(freqMap[word] *= emphasizeBy);
  });

  return freqMap;
}

export default emphasize;
