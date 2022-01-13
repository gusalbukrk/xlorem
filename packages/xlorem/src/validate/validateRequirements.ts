import {
  invalidRequirements,
  requirementsValuesTooSmall,
  invalidRequirementsSentencesPerParagraph,
  invalidRequirementsWordsPerSentence,
} from 'xlorem-common/src/errorMessages';
import { requirementsType } from 'xlorem-common/src/types';

function validateRequirements(requirements: requirementsType): string[] {
  const errors: string[] = [];

  const isRequirementsObjectValid =
    typeof requirements === 'object' &&
    Object.keys(requirements).length === 4 &&
    typeof requirements.sentencesPerParagraphMin === 'number' &&
    typeof requirements.sentencesPerParagraphMax === 'number' &&
    typeof requirements.wordsPerSentenceMin === 'number' &&
    typeof requirements.wordsPerSentenceMax === 'number';

  if (!isRequirementsObjectValid) {
    errors.push(invalidRequirements);
  }

  if (Object.values(requirements).some((n) => n < 3)) {
    errors.push(requirementsValuesTooSmall);
  }

  if (
    requirements.sentencesPerParagraphMax <
    requirements.sentencesPerParagraphMin * 2 - 1
  ) {
    errors.push(invalidRequirementsSentencesPerParagraph);
  }

  if (
    requirements.wordsPerSentenceMax <
    requirements.wordsPerSentenceMin * 2 - 1
  ) {
    errors.push(invalidRequirementsWordsPerSentence);
  }

  return errors;
}

export default validateRequirements;
