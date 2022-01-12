import 'cross-fetch/polyfill';

import { queryOrArticleType } from '@xlorem/common/src/types';

import article from './article';

import xloremBase from '.';

const xlorem = (input: queryOrArticleType) =>
  xloremBase({ queryOrArticle: input });

describe('main function', () => {
  it.each([
    { inputType: 'query', input: 'lorem ipsum' },
    { inputType: 'text', input: article },
  ])(
    'returns correctly (input type: $inputType)',
    async ({ input }) => {
      expect.assertions(3);

      const output = await xlorem(input);

      expect(Object.keys(output)).toHaveLength(2);
      expect(output.title).toBe('Lorem ipsum');
      expect(typeof output.body).toBe('string');
    },
    15000
  );
});
