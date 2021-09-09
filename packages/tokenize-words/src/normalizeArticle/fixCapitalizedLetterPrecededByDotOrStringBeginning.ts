import getCorrectWordCase from './getCorrectWordCase';

function replaceFunction(
  whole: string,
  firstLetter: string,
  restOfWord: string,
  offset: number,
  wholeText: string
): string {
  const wordAfterDot = firstLetter + restOfWord;

  const isInitials = /^[A-Z]+$/.test(wordAfterDot);
  if (isInitials) return whole;

  const correctCase = getCorrectWordCase(wordAfterDot, wholeText)[0];

  return whole.replace(firstLetter, correctCase);
}

function fixCapitalizedLetterPrecededByDotOrStringBeginning(
  article: string
): string {
  const capitalizedLetterPrecededByDotOrStringBeginning =
    /(?:^|\.\s+)([A-Z])(?=(\S*))/g;

  return article.replace(
    capitalizedLetterPrecededByDotOrStringBeginning,
    replaceFunction
  );
}

export default fixCapitalizedLetterPrecededByDotOrStringBeginning;
