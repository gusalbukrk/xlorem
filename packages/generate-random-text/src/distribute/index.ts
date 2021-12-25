import { unitType, breakdownType } from '@xlorem/common/src/types';
import { getRandomNumber } from '@xlorem/common/src/utils';

import breakNumberIntoChunks from './breakNumberIntoChunks';

function distribute(
  quantity: number,
  unit: unitType,
  breakdown: breakdownType
): number[][] {
  const {
    sentencesPerParagraphMin,
    sentencesPerParagraphMax,
    wordsPerSentenceMin,
    wordsPerSentenceMax,
  } = breakdown;

  const wordsPerParagraphMin = sentencesPerParagraphMin * wordsPerSentenceMin;
  const wordsPerParagraphMax = sentencesPerParagraphMax * wordsPerSentenceMax;

  // array of numbers
  // each number represents a paragraph (paragraph's quantity of words = number)
  const paragraphsDistribution =
    unit === 'paragraphs'
      ? Array.from({ length: quantity }).map(() =>
          getRandomNumber(wordsPerParagraphMin, wordsPerParagraphMax)
        )
      : breakNumberIntoChunks(
          quantity,
          wordsPerParagraphMin,
          wordsPerParagraphMax,
          Math.ceil(quantity / wordsPerParagraphMax), // paragraphsQuantityMin
          Math.floor(quantity / wordsPerParagraphMin) // paragraphsQuantityMax
        );

  // array containing arrays of numbers
  // each number represents a sentence (sentence's quantity of words = number)
  const sentencesDistribution = paragraphsDistribution.map(
    (wordsPerParagraph) =>
      breakNumberIntoChunks(
        wordsPerParagraph,
        wordsPerSentenceMin,
        wordsPerSentenceMax,
        Math.max(
          Math.ceil(wordsPerParagraph / wordsPerSentenceMax),
          sentencesPerParagraphMin
        ), // sentencesQuantityMin
        Math.min(
          Math.floor(wordsPerParagraph / wordsPerSentenceMin),
          sentencesPerParagraphMax
        ) // sentencesQuantityMax
      )
  );

  return sentencesDistribution;
}

export default distribute;
