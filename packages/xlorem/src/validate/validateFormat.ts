import { invalidFormat } from '@xlorem/common/src/errorMessages';
import { formatType } from '@xlorem/common/src/types';

function validateFormat(format: formatType): string[] {
  const errors: string[] = [];

  if (!(format === 'plain' || format === 'html')) {
    errors.push(invalidFormat);
  }

  return errors;
}

export default validateFormat;
