import 'cross-fetch/polyfill';

import xlorem from '../src';

import article from './article';

describe.each([
  ['lorem ipsum', 'query'],
  [article, 'article'],
])('main function', (queryOrArticle, type) => {
  it(`return output correctly (${type} input)`, async () => {
    expect.assertions(3);

    const output = await xlorem({ queryOrArticle });

    expect(Object.keys(output)).toHaveLength(2);
    expect(output.title).toBe('Lorem ipsum');
    expect(typeof output.body).toBe('string');
  }, 15000);
});
