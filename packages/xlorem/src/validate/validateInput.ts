import {
  neitherStringNorArticle,
  emptyQueryString,
  textTooShort,
} from '@xlorem/common/src/errorMessages';
import { inputType } from '@xlorem/common/src/types';

function validateInput(input: inputType): string[] {
  const errors: string[] = [];

  const isString = typeof input === 'string';

  const isArticle =
    typeof input === 'object' &&
    Object.keys(input).length === 2 &&
    typeof input.title === 'string' &&
    typeof input.body === 'string';

  if (!(isString || isArticle)) {
    errors.push(neitherStringNorArticle);
  }

  if (isString && input === '') {
    errors.push(emptyQueryString);
  }

  if (isArticle) {
    const wordsQuantityMinRequired = 150;
    const wordsQuantity = input.body.split(' ').length;

    if (wordsQuantity < wordsQuantityMinRequired) {
      errors.push(textTooShort);
    }
  }

  return errors;
}

export default validateInput;
