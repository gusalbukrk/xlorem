import { isStopword } from 'stopwords-utils/src/';

function removeSpacingBetweenInitials(initials: string) {
  return ` ${initials.replace(/\s/g, '')} `;
}

function removeStopwords(match: string) {
  return isStopword(match) ? '' : match;
}

function removeUselessStuff(string: string): string {
  const x = string
    // remove useless sections
    .replace(
      /==\s(Notes|References|Further\sreading|See\salso|Sources|External\slinks|Citations)\s==.*/s,
      ''
    )
    // remove useless punctuation
    .replace(/["()[\]{}<>,;?!\n=]+/g, '')
    .replace(/(\D):(\D)/g, '$1$2')
    .replace(/[—]+/g, ' ') // em dash
    .replace(/\.\.\./g, '')
    // remove stopwords
    .replace(/\S+/g, removeStopwords)
    // remove space between initials
    .replace(/(^|\s)([A-Z]\.(\s|$)){2,}/g, removeSpacingBetweenInitials);

  return x;
}

export default removeUselessStuff;
