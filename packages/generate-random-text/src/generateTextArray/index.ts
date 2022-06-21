import weightedRandomness from 'weighted-randomness/src';
import { freqMapType } from 'xlorem-common/types';

import capitalizeAndPunctuateSentence from './capitalizeAndPunctuateSentence.js';
import getRandomWord from './getRandomWord.js';

function generateTextArray(
  freqMap: freqMapType,
  distribution: number[][]
): string[][][] {
  const getRandomArticleWord = weightedRandomness(freqMap);

  const textArray = distribution.map((paragraphBreakdown) =>
    paragraphBreakdown.map((sentenceIntendedLength) =>
      capitalizeAndPunctuateSentence(
        Array.from({ length: sentenceIntendedLength }).reduce<string[]>(
          (sentence) =>
            sentence.concat(
              getRandomWord(
                sentence,
                sentenceIntendedLength,
                getRandomArticleWord
              )
            ),
          []
        )
      )
    )
  );

  return textArray;
}

export default generateTextArray;
