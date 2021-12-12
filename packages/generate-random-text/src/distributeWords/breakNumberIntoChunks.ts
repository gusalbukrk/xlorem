import { getRandomNumber } from '@xlorem/common/src/utils';

function breakNumberIntoChunks(
  number: number,
  chunkValueMin: number,
  chunkValueMax: number,
  distributionLengthMin: number,
  distributionLengthMax: number
): number[] {
  const distributionLength = getRandomNumber(
    distributionLengthMin,
    distributionLengthMax
  );

  return Array.from({ length: distributionLength }).reduce(
    (distribution: number[]) => {
      const sum = distribution.reduce((acc, cur) => acc + cur, 0);
      const rest = number - sum;
      const howManyChunksRemaining = distributionLength - distribution.length;

      if (rest === 0) return distribution;

      if (rest <= chunkValueMax && howManyChunksRemaining === 1) {
        return [...distribution, rest];
      }

      const nextMax = Math.min(
        (howManyChunksRemaining - 1) * chunkValueMax,
        rest
      );

      const min = Math.max(
        rest - nextMax, // it's always going to be between 0 and chunkValueMax
        chunkValueMin
      );

      const max = Math.min(
        rest - (howManyChunksRemaining - 1) * chunkValueMin,
        chunkValueMax
      );

      return [...distribution, getRandomNumber(min, max)];
    },
    [] as number[]
  );
}

export default breakNumberIntoChunks;
