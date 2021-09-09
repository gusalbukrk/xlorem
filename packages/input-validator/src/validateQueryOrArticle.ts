import getErrorMessage from '@xlorem/common/src/getErrorMessage';
import { queryOrArticleType, articleType } from '@xlorem/common/src/types';

function validateQueryOrArticle(queryOrArticle: queryOrArticleType): string[] {
  const errors: string[] = [];

  const isString = typeof queryOrArticle === 'string';

  const isArticle =
    typeof queryOrArticle === 'object' &&
    Object.keys(queryOrArticle).length === 2 &&
    typeof queryOrArticle.title === 'string' &&
    typeof queryOrArticle.body === 'string';

  if (!(isString || isArticle)) {
    errors.push(getErrorMessage('neither-string-nor-article'));
  }

  if (isString && queryOrArticle === '') {
    errors.push(getErrorMessage('empty-query-string'));
  }

  if (isArticle) {
    const wordsQuantityMinRequired = 150;
    const wordsQuantity = (queryOrArticle as articleType).body.split(
      ' '
    ).length;

    if (wordsQuantity < wordsQuantityMinRequired) {
      errors.push(getErrorMessage('text-too-short'));
    }
  }

  return errors;
}

export default validateQueryOrArticle;
