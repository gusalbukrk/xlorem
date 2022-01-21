import generateTextBase from 'generate-random-text/src/';
import generateFreqMap from 'generate-words-freqmap/src/';
import getWikipediaArticle from 'get-wikipedia-article/src/';
import tokenizeWords from 'tokenize-words/src/';
import { requirementsDefault } from 'xlorem-common/src/constants';
import {
  inputType,
  queryInputType,
  textInputType,
  wordsArrayInputType,
  unitType,
  formatType,
  requirementsType,
  freqMapType,
} from 'xlorem-common/src/types';

import validate from './validate';

function isInputQuery(input: inputType): input is queryInputType {
  return typeof input === 'string';
}

function isInputText(input: inputType): input is textInputType {
  return (input as textInputType).body !== undefined;
}

function isInputWordsArray(input: inputType): input is wordsArrayInputType {
  return (input as wordsArrayInputType).words !== undefined;
}

type optionsType = {
  unit: unitType;
  quantity: number;
  format: formatType;
  requirements: Partial<requirementsType>;
};

type output = {
  title: string;
  body: string;
};

/**
 * Feature-rich filler text generator.
 * @param input Filler text will be generated from this parameter.
 * @param options Miscellaneous options.
 * @returns Text object containing title and body.
 */
async function xlorem(
  input: inputType,
  {
    unit = 'paragraphs',
    quantity = unit === 'paragraphs' ? 5 : 200,
    format = 'plain',
    requirements = requirementsDefault,
  }: Partial<optionsType> = {}
): Promise<output> {
  const requirementsMerged = { ...requirementsDefault, ...requirements };

  validate(input, unit, quantity, format, requirementsMerged);

  const generateText = (freqMap: freqMapType) =>
    generateTextBase(freqMap, {
      unit,
      quantity,
      format,
      requirements: requirementsMerged,
    });

  if (isInputQuery(input)) {
    const { title, body, related } = (await getWikipediaArticle(input, [
      'title',
      'body',
      'related',
    ])) as { title: string; body: string; related: string[] };

    const wordsArray = tokenizeWords(body);

    const freqMap = generateFreqMap(wordsArray, related);

    const output = generateText(freqMap) as string;

    return { title, body: output };
  }

  if (isInputText(input)) {
    const wordsArray = tokenizeWords(input.body);

    const freqMap = generateFreqMap(wordsArray);

    const output = generateText(freqMap) as string;

    return { title: input.title, body: output };
  }

  if (isInputWordsArray(input)) {
    const freqMap = generateFreqMap(input.words);

    const output = generateText(freqMap) as string;

    return { title: input.title, body: output };
  }

  // if none of the `if` blocks above are true, input already is freqMap
  const output = generateText(input.map) as string;

  return { title: input.title, body: output };
}

export default xlorem;
