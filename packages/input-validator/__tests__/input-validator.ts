import { breakdownDefault } from '@xlorem/common/src/constants';
import getErrorMessage from '@xlorem/common/src/getErrorMessage';
import {
  queryOrArticleType,
  unitType,
  formatType,
  breakdownType,
} from '@xlorem/common/src/types';
import { paramsToObjParam } from '@xlorem/common/src/utils';

import inputValidatorBase from '../src';

interface inputValidatorInterface {
  queryOrArticle: queryOrArticleType;
  unit: unitType;
  quantity: number;
  format: formatType;
  breakdown: breakdownType;
}

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

    expect(w).toThrow(getErrorMessage('neither-string-nor-article'));
    expect(x).toThrow(getErrorMessage('neither-string-nor-article'));
    expect(y).toThrow(getErrorMessage('empty-query-string'));
    expect(z).toThrow(getErrorMessage('text-too-short'));
  });

  it('unit argument', () => {
    expect.assertions(2);

    // @ts-expect-error: test
    const x = () => inputValidator({ unit: '' });
    // @ts-expect-error: test
    const y = () => inputValidator({ unit: 'abcde' });

    expect(x).toThrow(getErrorMessage('invalid-unit'));
    expect(y).toThrow(getErrorMessage('invalid-unit'));
  });

  it('quantity argument', () => {
    expect.assertions(2);

    // @ts-expect-error: test
    const x = () => inputValidator({ quantity: '...' });
    const y = () => inputValidator({ quantity: 0 });

    expect(x).toThrow(getErrorMessage('quantity-not-number'));
    expect(y).toThrow(getErrorMessage('quantity-too-small'));
  });

  it('format argument', () => {
    expect.assertions(2);

    // @ts-expect-error: test
    const x = () => inputValidator({ format: '' });
    // @ts-expect-error: test
    const y = () => inputValidator({ format: 'abcde' });

    expect(x).toThrow(getErrorMessage('invalid-format'));
    expect(y).toThrow(getErrorMessage('invalid-format'));
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

    expect(w).toThrow(getErrorMessage('invalid-breakdown'));
    expect(x).toThrow(getErrorMessage('breakdown-values-too-small'));
    expect(y).toThrow(
      getErrorMessage('invalid-breakdown-sentencesPerParagraph')
    );
    expect(z).toThrow(getErrorMessage('invalid-breakdown-wordsPerSentence'));
  });
});
