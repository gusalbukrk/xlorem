import CustomError from 'xlorem-common/CustomError';
import {
  inputType,
  unitType,
  formatType,
  requirementsType,
} from 'xlorem-common/types';

import validateFormat from './validateFormat.js';
import validateInput from './validateInput.js';
import validateQuantity from './validateQuantity.js';
import validateRequirements from './validateRequirements.js';
import validateUnit from './validateUnit.js';

function validate(
  input: inputType,
  unit: unitType,
  quantity: number,
  format: formatType,
  requirements: requirementsType
): void {
  const errors = ([] as string[]).concat(
    validateInput(input),
    validateUnit(unit),
    validateQuantity(quantity, unit),
    validateFormat(format),
    validateRequirements(requirements)
  );

  if (errors.length > 0)
    throw new CustomError(`[ ${errors.join(', ')} ]`, 'xlorem');
}

export default validate;
