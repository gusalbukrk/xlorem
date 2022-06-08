import weightedRandomness from 'weighted-randomness/src';
import { freqMapType } from 'xlorem-common/src/types';

import capitalizeAndPunctuateSentence from './capitalizeAndPunctuateSentence';
import getRandomWord from './getRandomWord';

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
