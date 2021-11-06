import { breakdownDefault } from '@xlorem/common/src/constants';
import {
  freqMapType,
  unitType,
  formatType,
  breakdownType,
} from '@xlorem/common/src/types';
import {
  capitalize,
  isLowercase,
  isNumeric,
  getRandomNumber,
  last,
  paramsToObjParam,
} from '@xlorem/common/src/utils';
import { isStopword } from 'stopwords-utils/src/';

import generateTextBase from '../src';

type generateTextInterface = {
  freqMap: freqMapType;
  unit: unitType;
  quantity: number;
  format: formatType;
  breakdown: breakdownType;
  isTest: boolean | undefined;
};

const defaults: generateTextInterface = {
  freqMap: {
    3: ['dolor', 'sit', 'est'],
    7: ['placeholder', 'publishing', 'design', '1914'],
    10: ['filler', 'text', 'latin', '1960'],
    20: ['lorem', 'ipsum'],
  },
  unit: 'paragraphs',
  quantity: 5,
  format: 'plain',
  breakdown: breakdownDefault,
  isTest: true,
};

const generateText = paramsToObjParam(generateTextBase, defaults);

const removePunctuation = (word: string) =>
  word.replace(/[.!?,:;()[\]"—\s]/g, '');

describe('generateText returns correct number of paragraphs, sentences and words', () => {
  const paragraphsUnitTestTable = Array.from({ length: 10 }, () => [
    getRandomNumber(1, 20),
  ]);

  const wordsUnitTestTable = Array.from({ length: 10 }, () => [
    getRandomNumber(
      breakdownDefault.sentencesPerParagraphMin *
        breakdownDefault.wordsPerSentenceMin,
      500
    ),
  ]);

  it.each(paragraphsUnitTestTable)('paragraphs unit', (quantity) => {
    expect.assertions(1);
    expect(generateText({ quantity })).toHaveLength(quantity);
  });

  it.each(wordsUnitTestTable)('words unit', (quantity) => {
    expect.assertions(1);

    const textArray = generateText({
      unit: 'words',
      quantity,
    }) as string[][][];

    const wordsCount = textArray.reduce<number>(
      (acc, paragraph) =>
        acc +
        paragraph.reduce<number>((acc2, sentence) => acc2 + sentence.length, 0),
      0
    );

    expect(wordsCount).toBe(quantity);
  });

  it('sentences per paragraph', () => {
    expect.assertions(2);

    const textArray = generateText({ quantity: 30 }) as string[][][];

    const paragraphsLength = textArray.reduce<number[]>(
      (acc, paragraph) => acc.concat(paragraph.length),
      []
    );

    const x = Math.min(...paragraphsLength);
    const y = Math.max(...paragraphsLength);

    expect(x).toBeGreaterThanOrEqual(breakdownDefault.sentencesPerParagraphMin);
    expect(y).toBeLessThanOrEqual(breakdownDefault.sentencesPerParagraphMax);
  });

  it('words per sentence', () => {
    expect.assertions(2);

    const textArray = generateText({ quantity: 10 }) as string[][][];

    const sentencesLength = textArray.reduce<number[]>(
      (acc, paragraph) =>
        acc.concat(
          paragraph.reduce<number[]>(
            (acc2, sentence) => acc2.concat(sentence.length),
            []
          )
        ),
      []
    );

    const x = Math.min(...sentencesLength);
    const y = Math.max(...sentencesLength);

    expect(x).toBeGreaterThanOrEqual(breakdownDefault.wordsPerSentenceMin);
    expect(y).toBeLessThanOrEqual(breakdownDefault.wordsPerSentenceMax);
  });
});

describe('generateText returns text in the chosen format', () => {
  it('format: plain', () => {
    expect.assertions(1);

    const text = generateText({ isTest: false }) as string;

    expect(text.match(/\n/g)).toHaveLength(defaults.quantity - 1);
  });

  it('format: html', () => {
    expect.assertions(2);

    const text = generateText({
      format: 'html',
      isTest: false,
    }) as string;

    expect(text.match(/<p>/g)).toHaveLength(defaults.quantity);
    expect(text.match(/<\/p>/g)).toHaveLength(defaults.quantity);
  });
});

describe('generateText returns sentences punctuated and capitalized', () => {
  it('first letter capitalization', () => {
    expect.assertions(1);

    const x = (generateText() as string[][][]).every((paragraph) =>
      paragraph.every(
        (sentence) => sentence[0][0] === sentence[0][0].toUpperCase()
      )
    );

    expect(x).toBe(true);
  });

  it('end of sentence punctuation', () => {
    expect.assertions(1);

    const punctuations = [
      ...new Set(
        (generateText({ quantity: 15 }) as string[][][])
          .reduce((acc, paragraph) => acc.concat(paragraph))
          .map((sentence) => last(last(sentence).split('')))
      ),
    ].sort();

    expect(punctuations).toStrictEqual(['!', '.', '?']);
  });

  it('mid of sentence punctuation', () => {
    expect.assertions(1);

    const punctuations = [
      ...new Set(
        (generateText({ quantity: 40 }) as string[][][])
          .map((paragraph) =>
            paragraph.map((sentence) => sentence.join(' ')).join(' ')
          )
          .join(' ')
          .match(/[()[\]"—,;:]/g)
      ),
    ].sort();

    expect(punctuations).toStrictEqual([
      '"',
      '(',
      ')',
      ',',
      ':',
      ';',
      '[',
      ']',
      '—',
    ]);
  });

  it("simple mid punctuation isn't placed between stopwords or numbers", () => {
    expect.assertions(1);

    const containsPunctuation = (word: string) => /[,;:]/.test(word);

    const wordsBetweenPunctuationAreNeitherStopwordsNorNumbers = (
      generateText({ quantity: 40 }) as string[][][]
    )
      .reduce((acc, paragraph) => acc.concat(paragraph))
      .every((sentence) =>
        sentence.every((word, index, array) =>
          containsPunctuation(word) ||
          (index > 0 && containsPunctuation(array[index - 1])) // current word comes after punctuation
            ? !isStopword(word) && !isNumeric(word)
            : true
        )
      );

    expect(wordsBetweenPunctuationAreNeitherStopwordsNorNumbers).toBe(true);
  });

  it("enclosing mid punctuation isn't placed between stopwords", () => {
    expect.assertions(1);

    const wordsBetweenPunctuationAreNotStopwords = (
      generateText({ quantity: 30 }) as string[][][]
    )
      .reduce((acc, paragraph) => acc.concat(paragraph))
      .every((sentence) => {
        const wordsBetweenPunctuation = sentence.reduce<string[]>(
          (acc, word) => {
            if (/^[(["—]/.test(word)) {
              const previousWord = sentence[sentence.indexOf(word) - 1];

              [previousWord, removePunctuation(word)].forEach(
                (w) => !acc.includes(w) && acc.push(w)
              );
            }

            if (/[)\]"—]$/.test(word)) {
              const nextWord = sentence[sentence.indexOf(word) + 1];

              [removePunctuation(word), nextWord].forEach(
                (w) => !acc.includes(w) && acc.push(w)
              );
            }

            return acc;
          },
          []
        );

        return wordsBetweenPunctuation.every((word) => !isStopword(word));
      });

    expect(wordsBetweenPunctuationAreNotStopwords).toBe(true);
  });
});

describe('generateText returns correct word placement', () => {
  const textArray = generateText({ quantity: 25 }) as string[][][];

  it("there're no more than 2 subsequent stopwords", () => {
    expect.assertions(1);

    const noMoreThan2SubsequentStopwords = textArray.every((paragraph) =>
      paragraph.every((sentence) =>
        sentence.every((_, index, array) => {
          if (index === 0 || index === array.length - 1) return true;

          return array
            .slice(index - 1, index + 2)
            .some((word) => !isStopword(removePunctuation(word)));
        })
      )
    );

    expect(noMoreThan2SubsequentStopwords).toBe(true);
  });

  it("there're no more than 3 subsequent non-stopwords", () => {
    expect.assertions(1);

    const noMoreThan3SubsequentNonStopwords = textArray.every((paragraph) =>
      paragraph.every((sentence) =>
        sentence.every((_, index, array) => {
          if (index === 0 || index >= array.length - 2) return true;

          return array
            .slice(index - 1, index + 3)
            .some((word) => isStopword(removePunctuation(word)));
        })
      )
    );

    expect(noMoreThan3SubsequentNonStopwords).toBe(true);
  });

  it("sentences doesn't contain duplicate words", () => {
    expect.assertions(1);

    const noDuplicateWords = textArray.every((paragraph) =>
      paragraph.every((sentence) =>
        sentence
          .map((word, index) =>
            removePunctuation(index === 0 ? word.toLowerCase() : word)
          )
          .every((word, _, array) => {
            const isUnique = (el: string) =>
              array.indexOf(el) === array.lastIndexOf(el);

            return (
              isUnique(word) &&
              // check if there're not multiple instances of the same word with different casing
              (isLowercase(word[0])
                ? isUnique(capitalize(word))
                : isUnique(word.toLowerCase()))
            );
          })
      )
    );

    expect(noDuplicateWords).toBe(true);
  });

  it('sentences neither start nor end with numbers', () => {
    expect.assertions(1);

    const sentencesNeitherStartNorEndWithNumbers = textArray.every(
      (paragraph) =>
        paragraph.every(
          (sentence) => !isNumeric(sentence[0]) && !isNumeric(last(sentence))
        )
    );

    expect(sentencesNeitherStartNorEndWithNumbers).toBe(true);
  });

  it("sentences doesn't have more than one number", () => {
    expect.assertions(1);

    const noMoreThan1NumberPerSentence = textArray.every((paragraph) =>
      paragraph.every(
        (sentence) => sentence.filter((word) => isNumeric(word)).length <= 1
      )
    );

    expect(noMoreThan1NumberPerSentence).toBe(true);
  });
});
