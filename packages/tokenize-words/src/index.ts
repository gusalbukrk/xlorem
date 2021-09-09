import getErrorMessage from '@xlorem/common/src/getErrorMessage';

import normalizeArticle from './normalizeArticle';

function tokenizeWords(article: string, isTest = false): string[] {
  const wordsArray =
    normalizeArticle(article)
      .match(/\S+/g)
      ?.filter((w) => /\w/.test(w)) || [];

  if (!isTest && wordsArray.length === 0) {
    throw new Error(getErrorMessage('not-enough-keywords'));
  }

  return wordsArray;
}

export default tokenizeWords;
