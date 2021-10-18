import { escapeRegExp } from '@xlorem/common/src/utils';
import { isStopword } from 'stopwords-utils/src/';

function isWordContainingDotMoreCommon(
  wordContainingDot: string,
  wordWithoutDot: string,
  text: string
) {
  const wordWithDotNumberOfOccurrences = (
    text.match(
      new RegExp(`(^|\\s)${escapeRegExp(wordContainingDot)}(?=\\s|$)`, 'g')
    ) || []
  ).length;

  const wordWithoutDotNumberOfOccurrences = (
    text.match(
      new RegExp(`(^|\\s)${escapeRegExp(wordWithoutDot)}(?=\\s|$)`, 'g')
    ) || []
  ).length;

  return wordWithDotNumberOfOccurrences > wordWithoutDotNumberOfOccurrences;
}

function shouldPreserveTrailingDot(
  wordContainingTrailingDot: string,
  text: string
) {
  const wordWithoutDot = wordContainingTrailingDot.replace(/\.$/, '');

  const wordContainingTrailingDotOccursMoreThanOnce =
    text.indexOf(wordContainingTrailingDot) !==
    text.lastIndexOf(wordContainingTrailingDot);

  const isWordContainingTrailingDotMoreCommon = () =>
    isWordContainingDotMoreCommon(
      wordContainingTrailingDot,
      wordWithoutDot,
      text
    );

  return (
    wordContainingTrailingDotOccursMoreThanOnce &&
    isWordContainingTrailingDotMoreCommon()
  );
}

/**
 * Preserve dot if word containing trailing dot happens more than once
 * and more often than word without trailing dot.
 */
function handleTrailingDot(
  wordContainingTrailingDot: string,
  text: string
): string {
  const wordWithoutDot = wordContainingTrailingDot.slice(0, -1);

  if (isStopword(wordWithoutDot)) return '';

  const preserveTrailingDot = shouldPreserveTrailingDot(
    wordContainingTrailingDot,
    text
  );

  const handled = preserveTrailingDot
    ? wordContainingTrailingDot
    : wordWithoutDot;

  return handled;
}

export default handleTrailingDot;
