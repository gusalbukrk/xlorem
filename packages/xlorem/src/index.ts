import { requirementsDefault } from '@xlorem/common/src/constants';
import {
  queryOrArticleType,
  unitType,
  formatType,
  requirementsType,
} from '@xlorem/common/src/types';
import inputValidator from '@xlorem/input-validator/src';
import generateText from 'generate-random-text';
import generateFreqMap from 'generate-words-freqmap';
import getWikipediaArticle from 'get-wikipedia-article';
import tokenizeWords from 'tokenize-words';

type param = {
  queryOrArticle: queryOrArticleType;
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
  queryOrArticle,
  unit = 'paragraphs',
  quantity = unit === 'paragraphs' ? 5 : 200,
  format = 'plain',
  requirements = requirementsDefault,
}: param): Promise<output> {
  const requirementsMerged = { ...requirementsDefault, ...requirements };

  inputValidator(queryOrArticle, unit, quantity, format, requirementsMerged);

  const {
    title,
    body,
    related: wordsToEmphasize,
  } = (
    typeof queryOrArticle === 'string'
      ? await getWikipediaArticle(queryOrArticle, ['title', 'body', 'related'])
      : { ...queryOrArticle, related: [] }
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
