import { breakdownDefault } from '@xlorem/common/src/constants';
import { getRandomNumber } from '@xlorem/common/src/utils';

import distribute from '.';

// TODO: fix duplication
// each `describe` block contains 2 duplicate tests and only 1 distinct

describe.each(Array.from({ length: 20 }).map(() => getRandomNumber(1, 25)))(
  "'paragraphs' unit",
  (quantity) => {
    const distribution = distribute(quantity, 'paragraphs', breakdownDefault);

    it('quantity', () => {
      expect.assertions(1);

      const paragraphsQuantity = distribution.length;
      expect(paragraphsQuantity).toStrictEqual(quantity);
    });

    it('quantity of sentences per paragraph conforms with given `breakdown`', () => {
      expect.assertions(2);

      const sentencesQuantityOfEachParagraph = distribution.reduce(
        (acc, cur) => [...acc, cur.length],
        []
      );

      const min = Math.min(...sentencesQuantityOfEachParagraph);
      const max = Math.max(...sentencesQuantityOfEachParagraph);

      expect(min).toBeGreaterThanOrEqual(
        breakdownDefault.sentencesPerParagraphMin
      );

      expect(max).toBeLessThanOrEqual(
        breakdownDefault.sentencesPerParagraphMax
      );
    });

    it('quantity of words per sentence conforms with given `breakdown`', () => {
      expect.assertions(2);

      const wordsQuantityOfEachSentence = distribution.reduce(
        (acc, cur) => [...acc, ...cur],
        []
      );

      const min = Math.min(...wordsQuantityOfEachSentence);
      const max = Math.max(...wordsQuantityOfEachSentence);

      expect(min).toBeGreaterThanOrEqual(breakdownDefault.wordsPerSentenceMin);
      expect(max).toBeLessThanOrEqual(breakdownDefault.wordsPerSentenceMax);
    });
  }
);

describe.each(
  Array.from({ length: 20 }).map(() =>
    getRandomNumber(
      breakdownDefault.wordsPerSentenceMin *
        breakdownDefault.sentencesPerParagraphMin,
      2000
    )
  )
)("'words' unit", (quantity) => {
  const distribution = distribute(quantity, 'words', breakdownDefault);

  it('quantity', () => {
    expect.assertions(1);

    const wordsQuantity = distribution
      .reduce((acc, cur) => [...acc, ...cur], [])
      .reduce((acc, cur) => acc + cur);

    expect(wordsQuantity).toStrictEqual(quantity);
  });

  it('quantity of sentences per paragraph conforms with given `breakdown`', () => {
    expect.assertions(2);

    const sentencesQuantityOfEachParagraph = distribution.reduce(
      (acc, cur) => [...acc, cur.length],
      []
    );

    const min = Math.min(...sentencesQuantityOfEachParagraph);
    const max = Math.max(...sentencesQuantityOfEachParagraph);

    expect(min).toBeGreaterThanOrEqual(
      breakdownDefault.sentencesPerParagraphMin
    );

    expect(max).toBeLessThanOrEqual(breakdownDefault.sentencesPerParagraphMax);
  });

  it('quantity of words per sentence conforms with given `breakdown`', () => {
    expect.assertions(2);

    const wordsQuantityOfEachSentence = distribution.reduce(
      (acc, cur) => [...acc, ...cur],
      []
    );

    const min = Math.min(...wordsQuantityOfEachSentence);
    const max = Math.max(...wordsQuantityOfEachSentence);

    expect(min).toBeGreaterThanOrEqual(breakdownDefault.wordsPerSentenceMin);
    expect(max).toBeLessThanOrEqual(breakdownDefault.wordsPerSentenceMax);
  });
});
