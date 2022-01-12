import CustomError from '@xlorem/common/src/CustomError';
import {
  queryOrArticleType,
  unitType,
  formatType,
  requirementsType,
} from '@xlorem/common/src/types';

import validateFormat from './validateFormat';
import validateQuantity from './validateQuantity';
import validateQueryOrArticle from './validateQueryOrArticle';
import validateRequirements from './validateRequirements';
import validateUnit from './validateUnit';

function validate(
  queryOrArticle: queryOrArticleType,
  unit: unitType,
  quantity: number,
  format: formatType,
  requirements: requirementsType
): void {
  const errors = ([] as string[]).concat(
    validateQueryOrArticle(queryOrArticle),
    validateUnit(unit),
    validateQuantity(quantity, unit),
    validateFormat(format),
    validateRequirements(requirements)
  );

  if (errors.length > 0)
    throw new CustomError(`[ ${errors.join(', ')} ]`, 'xlorem');
}

export default validate;
