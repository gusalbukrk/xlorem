import { invalidFormat } from 'xlorem-common/errorMessages';
import { formatType } from 'xlorem-common/types';

function validateFormat(format: formatType): string[] {
  const errors: string[] = [];

  if (!(format === 'plain' || format === 'html')) {
    errors.push(invalidFormat);
  }

  return errors;
}

export default validateFormat;
