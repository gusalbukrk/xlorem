import { requirementsDefault } from '@xlorem/common/src/constants';
import {
  inputType,
  unitType,
  formatType,
  requirementsType,
} from '@xlorem/common/src/types';
import generateText from 'generate-random-text/src';
import generateFreqMap from 'generate-words-freqmap/src';
import getWikipediaArticle from 'get-wikipedia-article/src';
import tokenizeWords from 'tokenize-words/src';

import validate from './validate';

type param = {
  input: inputType;
  unit?: unitType;
  quantity?: number;
  format?: formatType;
  requirements?: Partial<requirementsType>;
};

type output = {
  title: string;
  body: string;
};

async function xlorem({
  input,
  unit = 'paragraphs',
  quantity = unit === 'paragraphs' ? 5 : 200,
  format = 'plain',
  requirements = requirementsDefault,
}: param): Promise<output> {
  const requirementsMerged = { ...requirementsDefault, ...requirements };

  validate(input, unit, quantity, format, requirementsMerged);

  const {
    title,
    body,
    related: wordsToEmphasize,
  } = (
    typeof input === 'string'
      ? await getWikipediaArticle(input, ['title', 'body', 'related'])
      : { ...input, related: [] }
  ) as { title: string; body: string; related: string[] };

  const wordsArray = tokenizeWords(body);

  const freqMap = generateFreqMap(wordsArray, wordsToEmphasize);

  const text = generateText(freqMap, {
    unit,
    quantity,
    format,
    requirements: requirementsMerged,
  }) as string;

  return { title, body: text };
}

export default xlorem;
