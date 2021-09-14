type tier = string[];
export type freqMapType = {
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

export type breakdownType = {
  sentencesPerParagraphMin: number;
  sentencesPerParagraphMax: number;
  wordsPerSentenceMin: number;
  wordsPerSentenceMax: number;
};
