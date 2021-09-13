import {
  invalidBreakdown,
  breakdownValuesTooSmall,
  invalidBreakdownSentencesPerParagraph,
  invalidBreakdownWordsPerSentence,
} from '@xlorem/common/src/errorMessages';
import { breakdownType } from '@xlorem/common/src/types';

function validateBreakdown(breakdown: breakdownType): string[] {
  const errors: string[] = [];

  const isBreakdownObjectValid =
    typeof breakdown === 'object' &&
    Object.keys(breakdown).length === 4 &&
    typeof breakdown.sentencesPerParagraphMin === 'number' &&
    typeof breakdown.sentencesPerParagraphMax === 'number' &&
    typeof breakdown.wordsPerSentenceMin === 'number' &&
    typeof breakdown.wordsPerSentenceMax === 'number';

  if (!isBreakdownObjectValid) {
    errors.push(invalidBreakdown);
  }

  if (Object.values(breakdown).some((n) => n < 3)) {
    errors.push(breakdownValuesTooSmall);
  }

  if (
    breakdown.sentencesPerParagraphMax <
    breakdown.sentencesPerParagraphMin * 2 - 1
  ) {
    errors.push(invalidBreakdownSentencesPerParagraph);
  }

  if (breakdown.wordsPerSentenceMax < breakdown.wordsPerSentenceMin * 2 - 1) {
    errors.push(invalidBreakdownWordsPerSentence);
  }

  return errors;
}

export default validateBreakdown;
