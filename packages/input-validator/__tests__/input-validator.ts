import { breakdownDefault } from '@xlorem/common/src/constants';
import * as errorMessages from '@xlorem/common/src/errorMessages';
import {
  queryOrArticleType,
  unitType,
  formatType,
  breakdownType,
} from '@xlorem/common/src/types';
import { paramsToObjParam } from '@xlorem/common/src/utils';

import inputValidatorBase from '../src';

type inputValidatorInterface = {
  queryOrArticle: queryOrArticleType;
  unit: unitType;
  quantity: number;
  format: formatType;
  breakdown: breakdownType;
};

const defaults: inputValidatorInterface = {
  queryOrArticle: '...',
  unit: 'paragraphs',
  quantity: 5,
  format: 'plain',
  breakdown: breakdownDefault,
};

const inputValidator = paramsToObjParam(inputValidatorBase, defaults);

describe('throw error messages correctly', () => {
  it('queryOrArticle argument', () => {
    expect.assertions(4);

    // @ts-expect-error: test
    const w = () => inputValidator({ queryOrArticle: [] });
    const x = () =>
      // @ts-expect-error: test
      inputValidator({ queryOrArticle: { title: true, body: [] } });
    const y = () => inputValidator({ queryOrArticle: '' });
    const z = () =>
      inputValidator({ queryOrArticle: { title: 'test', body: '' } });

    expect(w).toThrow(errorMessages.neitherStringNorArticle);
    expect(x).toThrow(errorMessages.neitherStringNorArticle);
    expect(y).toThrow(errorMessages.emptyQueryString);
    expect(z).toThrow(errorMessages.textTooShort);
  });

  it('unit argument', () => {
    expect.assertions(2);

    // @ts-expect-error: test
    const x = () => inputValidator({ unit: '' });
    // @ts-expect-error: test
    const y = () => inputValidator({ unit: 'abcde' });

    expect(x).toThrow(errorMessages.invalidUnit);
    expect(y).toThrow(errorMessages.invalidUnit);
  });

  it('quantity argument', () => {
    expect.assertions(2);

    // @ts-expect-error: test
    const x = () => inputValidator({ quantity: '...' });
    const y = () => inputValidator({ quantity: 0 });

    expect(x).toThrow(errorMessages.quantityNotNumber);
    expect(y).toThrow(errorMessages.quantityTooSmall);
  });

  it('format argument', () => {
    expect.assertions(2);

    // @ts-expect-error: test
    const x = () => inputValidator({ format: '' });
    // @ts-expect-error: test
    const y = () => inputValidator({ format: 'abcde' });

    expect(x).toThrow(errorMessages.invalidFormat);
    expect(y).toThrow(errorMessages.invalidFormat);
  });

  it('breakdown argument', () => {
    expect.assertions(4);

    // @ts-expect-error: test
    const w = () => inputValidator({ breakdown: {} });
    const x = () =>
      inputValidator({
        breakdown: {
          ...breakdownDefault,
          wordsPerSentenceMin: 2,
        },
      });
    const y = () =>
      inputValidator({
        breakdown: {
          ...breakdownDefault,
          sentencesPerParagraphMin: 5,
          sentencesPerParagraphMax: 5,
        },
      });
    const z = () =>
      inputValidator({
        breakdown: {
          ...breakdownDefault,
          wordsPerSentenceMin: 5,
          wordsPerSentenceMax: 5,
        },
      });

    expect(w).toThrow(errorMessages.invalidBreakdown);
    expect(x).toThrow(errorMessages.breakdownValuesTooSmall);
    expect(y).toThrow(errorMessages.invalidBreakdownSentencesPerParagraph);
    expect(z).toThrow(errorMessages.invalidBreakdownWordsPerSentence);
  });
});
