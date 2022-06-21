import { requirementsDefault } from 'xlorem-common/constants';
import {
  quantityNotNumber,
  quantityTooSmall,
} from 'xlorem-common/errorMessages';
import { unitType } from 'xlorem-common/types';

const { sentencesPerParagraphMin, wordsPerSentenceMin } = requirementsDefault;

function getType(value: unknown) {
  return Array.isArray(value) ? 'array' : typeof value;
}

function validateQuantity(quantity: number, unit: unitType): string[] {
  const errors: string[] = [];

  const type = getType(quantity);

  if (type !== 'number') {
    errors.push(quantityNotNumber);
  }

  if (type === 'number' && (unit === 'words' || unit === 'paragraphs')) {
    const wordsPerParagraphMin = sentencesPerParagraphMin * wordsPerSentenceMin;
    const minimumQuantityAllowed = unit === 'words' ? wordsPerParagraphMin : 1;

    if (quantity < minimumQuantityAllowed) {
      errors.push(quantityTooSmall);
    }
  }

  return errors;
}

export default validateQuantity;
