import {
  neitherStringNorArticle,
  emptyQueryString,
  textTooShort,
} from '@xlorem/common/src/errorMessages';
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
    errors.push(neitherStringNorArticle);
  }

  if (isString && queryOrArticle === '') {
    errors.push(emptyQueryString);
  }

  if (isArticle) {
    const wordsQuantityMinRequired = 150;
    const wordsQuantity = (queryOrArticle as articleType).body.split(
      ' '
    ).length;

    if (wordsQuantity < wordsQuantityMinRequired) {
      errors.push(textTooShort);
    }
  }

  return errors;
}

export default validateQueryOrArticle;
