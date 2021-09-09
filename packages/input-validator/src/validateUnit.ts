import getErrorMessage from '@xlorem/common/src/getErrorMessage';
import { unitType } from '@xlorem/common/src/types';

function validateUnit(unit: unitType): string[] {
  const errors: string[] = [];

  if (unit !== 'words' && unit !== 'paragraphs') {
    errors.push(getErrorMessage('invalid-unit'));
  }

  return errors;
}

export default validateUnit;
