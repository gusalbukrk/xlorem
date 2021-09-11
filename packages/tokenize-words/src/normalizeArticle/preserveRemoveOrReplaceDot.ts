import { isNumeric, escapeRegExp } from '@xlorem/common/src/utils';
import { isStopword } from 'stopwords-utils/src/';

import getCorrectWordCase from './getCorrectWordCase';

function isWordContainingTrailingDotAnAbbreviation(
  wordContainingTrailingDot: string,
  wholeText: string
) {
  const wordWithoutDot = escapeRegExp(
    wordContainingTrailingDot.replace('.', '')
  );

  const wordNotFollowedByDotRE = new RegExp(
    `(^|\\s)${wordWithoutDot}(?=\\s|$)`,
    'g'
  );
  const wordContainingTrailingDotRE = new RegExp(
    `(^|\\s)${wordWithoutDot}\\.(?=\\s|$)`,
    'g'
  );

  const textContainsWordNotFollowedByDot =
    wordNotFollowedByDotRE.test(wholeText);

  /* eslint-disable @typescript-eslint/prefer-regexp-exec */
  const wordContainingTrailingDotHappensOnlyOnce =
    (wholeText.match(wordContainingTrailingDotRE) || []).length === 1;
  /* eslint-disable @typescript-eslint/prefer-regexp-exec */

  return (
    !textContainsWordNotFollowedByDot &&
    !wordContainingTrailingDotHappensOnlyOnce
  );
}

function shouldPreserveDot(wordContainingDot: string, wholeText: string) {
  const isNumerical = isNumeric(wordContainingDot);
  const hasTrailingDot = /\.$/.test(wordContainingDot);
  const isNumericalAndDoesNotEndWithDot = isNumerical && !hasTrailingDot;

  const hasMultipleDots = (wordContainingDot.match(/\./g) || []).length > 1;

  const isLetterAfterDotLowerCase =
    !hasMultipleDots && /\.[a-z]/.test(wordContainingDot);

  const hasLeadingDot = /^\./.test(wordContainingDot);

  let isAbbreviation = false;
  if (!isNumerical && !hasMultipleDots && hasTrailingDot) {
    isAbbreviation =
      !isStopword(wordContainingDot.replace('.', '')) &&
      isWordContainingTrailingDotAnAbbreviation(wordContainingDot, wholeText);
  }

  return (
    isNumericalAndDoesNotEndWithDot ||
    hasMultipleDots ||
    isLetterAfterDotLowerCase ||
    hasLeadingDot ||
    isAbbreviation
  );
}

function replaceMiddleDotWithSpaceAndFixWordAfterDotCase(
  match: string,
  wholeText: string
) {
  const [, wordBeforeDot, wordAfterDot] = /^(.+)\.(.*)$/.exec(
    match
  ) as unknown as [string, string, string];

  const isWordBeforeDotStopword = isStopword(wordBeforeDot);
  const isWordAfterDotStopword = isStopword(wordAfterDot);

  if (isWordBeforeDotStopword && isWordAfterDotStopword) return '';
  if (isWordBeforeDotStopword) return wordAfterDot;
  if (isWordAfterDotStopword) return wordBeforeDot;

  const wordAfterDotCorrectCase = getCorrectWordCase(wordAfterDot, wholeText);

  return `${wordBeforeDot} ${wordAfterDotCorrectCase}`;
}

function removeTrailingDot(wordContainingTrailingDot: string) {
  const dotRemoved = wordContainingTrailingDot.replace(/\./g, '');

  if (isStopword(dotRemoved)) return '';

  return dotRemoved;
}

function replaceFunction(
  wordContainingDot: string,
  offset: number,
  wholeText: string
): string {
  const preserveDot = shouldPreserveDot(wordContainingDot, wholeText);
  const hasTrailingDot = /\.$/.test(wordContainingDot);

  let wordContainingDotFixed: string;
  if (preserveDot) {
    wordContainingDotFixed = wordContainingDot;
  } else if (hasTrailingDot) {
    wordContainingDotFixed = removeTrailingDot(wordContainingDot);
  } else {
    // else, if dot is in the middle (e.g. 'end.Start')
    // this happens because the API doesn't send proper spacing,
    // when a paragraph ends in a citation (superscript number in brackets)
    // paragraph's last word and next paragraph's first word are glued together, separated only by a dot
    wordContainingDotFixed = replaceMiddleDotWithSpaceAndFixWordAfterDotCase(
      wordContainingDot,
      wholeText
    );
  }

  return wordContainingDotFixed;
}

function preserveRemoveOrReplaceDot(article: string): string {
  const wordContainingDot = /\S*\.\S*/g;

  return article.replace(wordContainingDot, replaceFunction);
}

export default preserveRemoveOrReplaceDot;
