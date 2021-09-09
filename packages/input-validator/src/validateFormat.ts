import getErrorMessage from '@xlorem/common/src/getErrorMessage';
import { formatType } from '@xlorem/common/src/types';

function validateFormat(format: formatType): string[] {
  const errors: string[] = [];

  if (!(format === 'plain' || format === 'html')) {
    errors.push(getErrorMessage('invalid-format'));
  }

  return errors;
}

export default validateFormat;
