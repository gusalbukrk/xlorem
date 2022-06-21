import { invalidUnit } from 'xlorem-common/errorMessages';
import { unitType } from 'xlorem-common/types';

function validateUnit(unit: unitType): string[] {
  const errors: string[] = [];

  if (unit !== 'words' && unit !== 'paragraphs') {
    errors.push(invalidUnit);
  }

  return errors;
}

export default validateUnit;
