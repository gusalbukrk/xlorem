import { getCorrectWordCase } from '../common/utils.js';

/**
 * Preserve capitalization in words preceded by dot or convert to lowercase.
 */
function handleCapitalizedLetterPrecededByDotOrStringBeginning(
  text: string
): string {
  return text.replace(
    /(?:^|\.\s+)([A-Z]\S*)/g, // capitalizedLetterPrecededByDotOrStringBeginning
    (match: string, wordAfterDot: string, _, whole: string): string =>
      /^[A-Z]+$/.test(wordAfterDot)
        ? match // if word is acronym (all uppercase), leave as it is
        : match.replace(wordAfterDot, getCorrectWordCase(wordAfterDot, whole))
  );
}

export default handleCapitalizedLetterPrecededByDotOrStringBeginning;
