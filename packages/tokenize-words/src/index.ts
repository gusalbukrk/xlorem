import { notEnoughKeywords } from '@xlorem/common/src/errorMessages';

import normalizeArticle from './normalizeArticle';

function tokenizeWords(article: string, isTest = false): string[] {
  const wordsArray =
    normalizeArticle(article)
      .match(/\S+/g)
      ?.filter((w) => /\w/.test(w)) || [];

  if (!isTest && wordsArray.length === 0) {
    throw new Error(notEnoughKeywords);
  }

  return wordsArray;
}

export default tokenizeWords;
