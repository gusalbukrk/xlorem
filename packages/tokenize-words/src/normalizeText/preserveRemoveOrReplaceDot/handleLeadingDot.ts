import { escapeRegExp } from '@xlorem/common/src/utils';
import { isStopword } from 'stopwords-utils/src/';

import { getCorrectWordCase } from '../../common/utils';

/** Preserve or remove leading dot. */
function handleLeadingDot(wordContainingLeadingDot: string, text: string) {
  const wordWithoutDot = wordContainingLeadingDot.substring(1);

  if (isStopword(wordWithoutDot)) return '';

  const doesTextContainsMultipleOccurrences =
    (
      text.match(
        new RegExp(
          `(^|\\W)${escapeRegExp(wordContainingLeadingDot)}(?=(\\W|$))`,
          'g'
        )
      ) || []
    ).length > 1;

  const correctWordForm = doesTextContainsMultipleOccurrences
    ? wordContainingLeadingDot
    : getCorrectWordCase(wordWithoutDot, text);

  return correctWordForm;
}

export default handleLeadingDot;
