import { isStopword } from 'stopwords-utils/src/';

function removeUselessStuff(string: string): string {
  const removed = string
    // remove useless sections
    .replace(
      /==\s(Notes|References|Further\sreading|See\salso|Sources|External\slinks|Citations)\s==.*/s,
      ''
    )

    // remove useless punctuation
    .replace(/["()[\]{}<>–—;?!\n=]+/g, ' ')
    .replace(/(\D):(\D)/g, '$1$2') // preserve colon in numbers
    .replace(/,(?=(\s|$))/g, ' ') // comma(s) inside number will be preserved
    .replace(/\.{2,}|…/g, ' ')

    // remove stopwords
    .replace(/\S+/g, (match: string) => (isStopword(match) ? '' : match))

    // remove space between initials
    .replace(
      /(^|\s)([A-Z]\.(\s|$)){2,}/g,
      (initials: string) => ` ${initials.replace(/\s/g, '')} `
    );

  return removed;
}

export default removeUselessStuff;
