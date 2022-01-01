type tier = string[];
/** e.g.: `{ 1: ['foo', 'bar'], 3: ['baz'] }` */
export type freqMapType = {
  // `weight` is a string containing an integer (JS object keys can only be strings and symbols)
  [weight: string]: tier;
};

export type articleType = {
  title: string;
  body: string;
  wordsToEmphasize: string[];
};

export type queryOrArticleType = string | Omit<articleType, 'wordsToEmphasize'>;

export type unitType = 'paragraphs' | 'words';

export type formatType = 'plain' | 'html';

export type requirementsType = {
  sentencesPerParagraphMin: number;
  sentencesPerParagraphMax: number;
  wordsPerSentenceMin: number;
  wordsPerSentenceMax: number;
};
