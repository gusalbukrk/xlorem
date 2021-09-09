import getErrorMessage from '@xlorem/common/src/getErrorMessage';
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
    errors.push(getErrorMessage('invalid-breakdown'));
  }

  if (Object.values(breakdown).some((n) => n < 3)) {
    errors.push(getErrorMessage('breakdown-values-too-small'));
  }

  if (
    breakdown.sentencesPerParagraphMax <
    breakdown.sentencesPerParagraphMin * 2 - 1
  ) {
    errors.push(getErrorMessage('invalid-breakdown-sentencesPerParagraph'));
  }

  if (breakdown.wordsPerSentenceMax < breakdown.wordsPerSentenceMin * 2 - 1) {
    errors.push(getErrorMessage('invalid-breakdown-wordsPerSentence'));
  }

  return errors;
}

export default validateBreakdown;
