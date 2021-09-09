import { breakdownDefault } from '@xlorem/common/src/constants';
import {
  queryOrArticleType,
  unitType,
  formatType,
  breakdownType,
} from '@xlorem/common/src/types';
import inputValidator from '@xlorem/input-validator/src/';
import generateText from 'generate-random-text/src/';
import generateFreqMap from 'generate-words-freqmap/src/';
import getArticle from 'get-wikipedia-article/src/index';
import tokenizeWords from 'tokenize-words/src/';

interface param {
  queryOrArticle: queryOrArticleType;
  unit?: unitType;
  quantity?: number;
  format?: formatType;
  breakdown?: Partial<breakdownType>;
}

interface output {
  title: string;
  body: string;
}

async function xlorem({
  queryOrArticle,
  unit = 'paragraphs',
  quantity = unit === 'paragraphs' ? 5 : 200,
  format = 'plain',
  breakdown = breakdownDefault,
}: param): Promise<output> {
  const breakdownMerged = { ...breakdownDefault, ...breakdown };

  inputValidator(queryOrArticle, unit, quantity, format, breakdownMerged);

  const { title, body, wordsToEmphasize } =
    typeof queryOrArticle === 'string'
      ? await getArticle(queryOrArticle)
      : { ...queryOrArticle, wordsToEmphasize: [] };

  const wordsArray = tokenizeWords(body);

  const freqMap = generateFreqMap(
    wordsArray,
    wordsToEmphasize,
    breakdownMerged.wordsPerSentenceMax
  );

  const text = generateText(
    freqMap,
    unit,
    quantity,
    format,
    breakdownMerged
  ) as string;

  console.log({ title, body, wordsToEmphasize });
  console.log(wordsArray);
  console.log(freqMap);
  console.log(text);

  const output = { title, body: text };
  return output;
}

export default xlorem;

xlorem({ queryOrArticle: 'harry potter' })
  .then()
  .catch((e) => console.log(e));
