// messages aren't inside an object because
// tree-shaking isn't possible when exporting an object
// https://medium.com/@rauschma/note-that-default-exporting-objects-is-usually-an-anti-pattern-if-you-want-to-export-the-cf674423ac38#.nibatprx3

// used at @xlorem/input-validator
export const neitherStringNorArticle =
  'Expected `queryOrArticle` argument to be a query string or an object ({ title: string, body: string }).';
export const emptyQueryString =
  'Expected non-empty query string at `queryOrArticle` argument.';
export const textTooShort =
  'Expected given text (in `queryOrArticle.body` argument) to have at least 150 words.';
export const invalidUnit =
  "Expected `unit` argument to be 'words' or 'paragraphs'.";
export const quantityNotNumber = 'Expected `quantity` argument to be a number.';
export const quantityTooSmall =
  'Expected `quantity` argument to be greater than 28 words / 1 paragraph.';
export const invalidFormat =
  "Expected `format` argument to be 'plain' or 'html'.";
export const invalidBreakdown =
  'Expected `breakdown` argument to be an object ({ sentencesPerParagraphMin: number, sentencesPerParagraphMax: number, wordsPerSentenceMin: number, wordsPerSentenceMax: number; }).';
export const breakdownValuesTooSmall =
  'Expected all `breakdown` argument properties to be at least 3.';
export const invalidBreakdownSentencesPerParagraph =
  'Expected `breakdown.sentencesPerParagraphMax` argument to be at least (sentencesPerParagraphMin * 2 - 1).';
export const invalidBreakdownWordsPerSentence =
  'Expected `breakdown.wordsPerSentenceMax` argument to be at least (wordsPerSentenceMin * 2 - 1).';

export const articleNotFound =
  'Wikipedia does not have an article with this exact title. Try again using a different query.';

export const articleIsDisambiguation = (suggestions: string[]): string =>
  `This query points to a Wikipedia disambiguation page. You've got to be more specific.${
    suggestions.length > 0
      ? ` Query suggestions:\n- ${suggestions.splice(0, 10).join('\n- ')}.`
      : ` No query suggestions were found.`
  }`;

export const notEnoughWordsInWordsArray = (minimum: number, received: number) =>
  `Given \`text\` doesn't have enough keywords to construct \`wordsArray\` containing the minimum quantity of words required. Minimum number of words required: ${minimum}. Number of words received: ${received}.`;

export const notEnoughWordsInFreqMap = (minimum: number, received: number) =>
  `Given \`wordsArray\` doesn't have enough words to construct \`freqMap\` containing the minimum quantity of words required. Minimum number of words required: ${minimum}. Number of words received: ${received}.`;
