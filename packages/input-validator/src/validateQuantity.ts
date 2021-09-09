import { breakdownDefault } from '@xlorem/common/src/constants';
import getErrorMessage from '@xlorem/common/src/getErrorMessage';
import { unitType } from '@xlorem/common/src/types';

const { sentencesPerParagraphMin, wordsPerSentenceMin } = breakdownDefault;

function getType(value: unknown) {
  return Array.isArray(value) ? 'array' : typeof value;
}

function validateQuantity(quantity: number, unit: unitType): string[] {
  const errors: string[] = [];

  const type = getType(quantity);

  if (type !== 'number') {
    errors.push(getErrorMessage('quantity-not-number'));
  }

  if (type === 'number' && (unit === 'words' || unit === 'paragraphs')) {
    const wordsPerParagraphMin = sentencesPerParagraphMin * wordsPerSentenceMin;
    const minimumQuantityAllowed = unit === 'words' ? wordsPerParagraphMin : 1;

    if (quantity < minimumQuantityAllowed) {
      errors.push(getErrorMessage('quantity-too-small'));
    }
  }

  return errors;
}

export default validateQuantity;
