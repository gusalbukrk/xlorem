import { escapeRegExp } from '@xlorem/common/src/utils';

function getCorrectWordCase(
  wordCapitalized: string,
  wholeText: string
): string {
  const hasTrailingDot =
    /\.$/.test(wordCapitalized) &&
    (wordCapitalized.match(/\./g) || []).length === 1;
  const wordWithoutTrailingDot = hasTrailingDot
    ? wordCapitalized.replace('.', '')
    : wordCapitalized;

  const wordLowercase = wordWithoutTrailingDot.toLowerCase();
  const lowercaseEscaped = escapeRegExp(wordLowercase);
  const lowercaseRE = new RegExp(`(^|\\s)${lowercaseEscaped}(\\s|\\.|$)`, 'g');

  const doesLowercaseExistsInText = lowercaseRE.test(wholeText);

  return doesLowercaseExistsInText ? wordLowercase : wordCapitalized;
}

export default getCorrectWordCase;
