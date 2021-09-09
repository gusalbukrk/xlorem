import { formatType } from '@xlorem/common/src/types';

function stringifyTextArray(
  textArray: string[][][],
  format: formatType
): string {
  let text: string;

  if (format === 'plain') {
    text = textArray
      .map((paragraph) =>
        paragraph.map((sentence) => sentence.join(' ')).join(' ')
      )
      .join('\n');
  } else {
    // format === 'html'
    text = textArray
      .map(
        (paragraph) =>
          `<p>${paragraph.map((sentence) => sentence.join(' ')).join(' ')}</p>`
      )
      .join('');
  }

  return text;
}

export default stringifyTextArray;
