import {
  neitherStringNorArticle,
  emptyQueryString,
  textTooShort,
} from '@xlorem/common/src/errorMessages';
import {
  inputType,
  textInputType,
  wordsArrayInputType,
  freqMapInputType,
} from '@xlorem/common/src/types';

function validateInput(input: inputType): string[] {
  const errors: string[] = [];

  const isQueryString = typeof input === 'string';

  const isText =
    typeof input === 'object' &&
    Object.keys(input).length === 2 &&
    typeof input.title === 'string' &&
    typeof (input as textInputType).body === 'string';

  const isWordsArray = Array.isArray((input as wordsArrayInputType).words);

  const { map } = input as freqMapInputType;
  const isFreqMap =
    // first 3 check if it's an object
    typeof map === 'object' &&
    map !== null &&
    !Array.isArray(map) &&
    Object.keys(map).every((prop) => /^\d+$/.test(prop)) &&
    Object.values(map).every((arr) => Array.isArray(arr));

  if (!(isQueryString || isText || isWordsArray || isFreqMap)) {
    errors.push(neitherStringNorArticle);
  }

  if (isQueryString && input === '') {
    errors.push(emptyQueryString);
  }

  if (isText) {
    const wordsQuantityMinRequired = 150;
    const wordsQuantity = (input as textInputType).body.split(' ').length;

    if (wordsQuantity < wordsQuantityMinRequired) {
      errors.push(textTooShort);
    }
  }

  return errors;
}

export default validateInput;
