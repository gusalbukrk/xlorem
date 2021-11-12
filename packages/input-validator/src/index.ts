import CustomError from '@xlorem/common/src/CustomError';
import {
  queryOrArticleType,
  unitType,
  formatType,
  breakdownType,
} from '@xlorem/common/src/types';

import validateBreakdown from './validateBreakdown';
import validateFormat from './validateFormat';
import validateQuantity from './validateQuantity';
import validateQueryOrArticle from './validateQueryOrArticle';
import validateUnit from './validateUnit';

function inputValidator(
  queryOrArticle: queryOrArticleType,
  unit: unitType,
  quantity: number,
  format: formatType,
  breakdown: breakdownType
): void {
  const errors = ([] as string[]).concat(
    validateQueryOrArticle(queryOrArticle),
    validateUnit(unit),
    validateQuantity(quantity, unit),
    validateFormat(format),
    validateBreakdown(breakdown)
  );

  if (errors.length > 0)
    throw new CustomError(`[ ${errors.join(', ')} ]`, 'input-validator');
}

export default inputValidator;
