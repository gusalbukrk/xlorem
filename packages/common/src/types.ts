type tier = string[];
export interface freqMapType {
  [weight: string]: tier;
}

export interface articleType {
  title: string;
  body: string;
  wordsToEmphasize: string[];
}

export type queryOrArticleType = string | Omit<articleType, 'wordsToEmphasize'>;

export type unitType = 'paragraphs' | 'words';

export type formatType = 'plain' | 'html';

export interface breakdownType {
  sentencesPerParagraphMin: number;
  sentencesPerParagraphMax: number;
  wordsPerSentenceMin: number;
  wordsPerSentenceMax: number;
}
