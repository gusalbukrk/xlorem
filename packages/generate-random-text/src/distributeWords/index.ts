import { unitType, breakdownType } from '@xlorem/common/src/types';
import { getRandomNumber } from '@xlorem/common/src/utils';

import breakNumberIntoChunks from './breakNumberIntoChunks';

function distributeWords(
  unit: unitType,
  quantity: number,
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

  const paragraphsBreakdown: number[] =
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

  const sentencesBreakdown = paragraphsBreakdown.map((wordsPerParagraph) =>
    breakNumberIntoChunks(
      wordsPerParagraph,
      wordsPerSentenceMin,
      wordsPerSentenceMax,
      Math.max(
        Math.ceil(wordsPerParagraph / wordsPerSentenceMax),
        sentencesPerParagraphMin
      ),
      Math.min(
        Math.floor(wordsPerParagraph / wordsPerSentenceMin),
        sentencesPerParagraphMax
      )
    )
  );

  return sentencesBreakdown;
}

export default distributeWords;
