const messages = {
  // inputValidator
  'neither-string-nor-article':
    'Expected `queryOrArticle` argument to be a query string or an object ({ title: string, body: string }).',
  'empty-query-string':
    'Expected non-empty query string at `queryOrArticle` argument.',
  'text-too-short':
    'Expected given text (in `queryOrArticle.body` argument) to have at least 150 words.',
  'invalid-unit': "Expected `unit` argument to be 'words' or 'paragraphs'.",
  'quantity-not-number': 'Expected `quantity` argument to be a number.',
  'quantity-too-small':
    'Expected `quantity` argument to be greater than 28 words / 1 paragraph.',
  'invalid-format': "Expected `format` argument to be 'plain' or 'html'.",
  'invalid-breakdown':
    'Expected `breakdown` argument to be an object ({ sentencesPerParagraphMin: number, sentencesPerParagraphMax: number, wordsPerSentenceMin: number, wordsPerSentenceMax: number; }).',
  'breakdown-values-too-small':
    'Expected all `breakdown` argument properties to be at least 3.',
  'invalid-breakdown-sentencesPerParagraph':
    'Expected `breakdown.sentencesPerParagraphMax` argument to be at least (sentencesPerParagraphMin * 2 - 1).',
  'invalid-breakdown-wordsPerSentence':
    'Expected `breakdown.wordsPerSentenceMax` argument to be at least (wordsPerSentenceMin * 2 - 1).',

  //
  'article-not-found':
    'Wikipedia does not have an article with this exact title. Try again using a different query.',
  'article-is-disambiguation':
    "This query points to a Wikipedia disambiguation page. You've got to be more specific.",
  'not-enough-keywords':
    "Text doesn't contain enough keywords (words that aren't stop words). Use another query/article.",
};

function getErrorMessage(error: keyof typeof messages): string {
  return messages[error];
}

export default getErrorMessage;
