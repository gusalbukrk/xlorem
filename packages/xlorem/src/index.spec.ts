import 'cross-fetch/polyfill';

import { inputType } from 'xlorem-common/types';

import article from './article.js';

import xloremBase from './index.js';

const xlorem = (input: inputType) => xloremBase(input);

describe('main function', () => {
  it.each([
    { type: 'query', input: 'lorem ipsum' },
    { type: 'text', input: article },
  ])(
    'returns correctly (input type: $type)',
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
