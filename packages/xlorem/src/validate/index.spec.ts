import { requirementsDefault } from '@xlorem/common/src/constants';
import * as errorMessages from '@xlorem/common/src/errorMessages';
import {
  queryOrArticleType,
  unitType,
  formatType,
  requirementsType,
} from '@xlorem/common/src/types';
import { paramsToObjParam } from '@xlorem/common/src/utils';

import validateBase from '.';

type validateInterface = {
  queryOrArticle: queryOrArticleType;
  unit: unitType;
  quantity: number;
  format: formatType;
  requirements: requirementsType;
};

const defaults: validateInterface = {
  queryOrArticle: '...',
  unit: 'paragraphs',
  quantity: 5,
  format: 'plain',
  requirements: requirementsDefault,
};

const validate = paramsToObjParam(validateBase, defaults);

describe('throw error messages correctly', () => {
  it('queryOrArticle argument', () => {
    expect.assertions(4);

    // @ts-expect-error: test
    const w = () => validate({ queryOrArticle: [] });
    const x = () =>
      // @ts-expect-error: test
      validate({ queryOrArticle: { title: true, body: [] } });
    const y = () => validate({ queryOrArticle: '' });
    const z = () => validate({ queryOrArticle: { title: 'test', body: '' } });

    expect(w).toThrow(errorMessages.neitherStringNorArticle);
    expect(x).toThrow(errorMessages.neitherStringNorArticle);
    expect(y).toThrow(errorMessages.emptyQueryString);
    expect(z).toThrow(errorMessages.textTooShort);
  });

  it('unit argument', () => {
    expect.assertions(2);

    // @ts-expect-error: test
    const x = () => validate({ unit: '' });
    // @ts-expect-error: test
    const y = () => validate({ unit: 'abcde' });

    expect(x).toThrow(errorMessages.invalidUnit);
    expect(y).toThrow(errorMessages.invalidUnit);
  });

  it('quantity argument', () => {
    expect.assertions(2);

    // @ts-expect-error: test
    const x = () => validate({ quantity: '...' });
    const y = () => validate({ quantity: 0 });

    expect(x).toThrow(errorMessages.quantityNotNumber);
    expect(y).toThrow(errorMessages.quantityTooSmall);
  });

  it('format argument', () => {
    expect.assertions(2);

    // @ts-expect-error: test
    const x = () => validate({ format: '' });
    // @ts-expect-error: test
    const y = () => validate({ format: 'abcde' });

    expect(x).toThrow(errorMessages.invalidFormat);
    expect(y).toThrow(errorMessages.invalidFormat);
  });

  it('requirements argument', () => {
    expect.assertions(4);

    // @ts-expect-error: test
    const w = () => validate({ requirements: {} });
    const x = () =>
      validate({
        requirements: {
          ...requirementsDefault,
          wordsPerSentenceMin: 2,
        },
      });
    const y = () =>
      validate({
        requirements: {
          ...requirementsDefault,
          sentencesPerParagraphMin: 5,
          sentencesPerParagraphMax: 5,
        },
      });
    const z = () =>
      validate({
        requirements: {
          ...requirementsDefault,
          wordsPerSentenceMin: 5,
          wordsPerSentenceMax: 5,
        },
      });

    expect(w).toThrow(errorMessages.invalidRequirements);
    expect(x).toThrow(errorMessages.requirementsValuesTooSmall);
    expect(y).toThrow(errorMessages.invalidRequirementsSentencesPerParagraph);
    expect(z).toThrow(errorMessages.invalidRequirementsWordsPerSentence);
  });
});
