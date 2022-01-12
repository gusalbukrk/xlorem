type tier = string[];
/** e.g.: `{ 1: ['foo', 'bar'], 3: ['baz'] }` */
export type freqMapType = {
  // `weight` is a string containing an integer (JS object keys can only be strings and symbols)
  [weight: string]: tier;
};

/** input type */
export type textType = {
  title: string;
  body: string;
};

export type inputType =
  | string // wikipedia query string
  | textType; // text

export type unitType = 'paragraphs' | 'words';

export type formatType = 'plain' | 'html';

export type requirementsType = {
  sentencesPerParagraphMin: number;
  sentencesPerParagraphMax: number;
  wordsPerSentenceMin: number;
  wordsPerSentenceMax: number;
};
