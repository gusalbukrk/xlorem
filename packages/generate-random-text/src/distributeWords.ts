import { unitType, breakdownType } from '@xlorem/common/src/types';
import { getRandomNumber } from '@xlorem/common/src/utils';

function breakNumberIntoChunks(
  number: number,
  chunkMin: number,
  chunkMax: number,
  chunksLengthMin: number,
  chunksLengthMax: number
): number[] {
  const chunks: number[] = [];

  let rest = number;

  while (chunks.length < chunksLengthMax) {
    // won't let random chunk be smaller than it needs to be
    const nextChunksMaxValue = chunkMax * (chunksLengthMax - chunks.length - 1);
    const minPossible = rest - nextChunksMaxValue; // it'll always be <= chunkMax
    const min = Math.max(chunkMin, minPossible); // it'll be between (and inclusive) chunkMin & chunkMax

    // make sure that chunks.length will be at least chunksLengthMin
    const isChunksSmallerThanShouldBe = chunks.length < chunksLengthMin - 1;
    const nextChunksMinValue = chunkMin * (chunksLengthMin - chunks.length - 1);
    const maxPossible = rest - nextChunksMinValue; // it'll was be >= chunkMin
    const max = Math.min(
      chunkMax,
      isChunksSmallerThanShouldBe ? maxPossible : rest
    ); // it'll be between (and inclusive) chunkMin

    let chunk = getRandomNumber(min, max);

    const nextRest = rest - chunk;
    const isNextRestTooSmallToBeAChunk = nextRest > 0 && nextRest < chunkMin;
    const isCurrentRestTooLargerToBeAChunk = rest > chunkMax;

    if (isNextRestTooSmallToBeAChunk) {
      if (isCurrentRestTooLargerToBeAChunk) {
        if (rest / 2 >= chunkMin) {
          // e.g.: min = 7, max = 12, rest = 14
          chunk = Math.floor(rest / 2);
        } else {
          // e.g.: min = 7, max = 12, rest = 13
          // NOTE: with min, max like these,
          // it's impossible to create chunk with value between min and max
          chunk = rest; // break rule, create chunk with value higher than max
        }
      } else {
        chunk = rest;
      }
    }

    chunks.push(chunk);
    rest -= chunk;

    if (rest === 0) break;
  }

  return chunks;
}

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
      sentencesPerParagraphMin,
      sentencesPerParagraphMax
    )
  );

  return sentencesBreakdown;
}

export default distributeWords;
