import 'cross-fetch/polyfill';

import getErrorMessage from '@xlorem/common/src/getErrorMessage';

import getArticle from '../src';

describe('api call', () => {
  it('request', async () => {
    expect.assertions(4);

    const article = await getArticle('lorem ipsum');

    const x = Object.keys(article).sort();

    expect(x).toStrictEqual(['body', 'title', 'wordsToEmphasize']);
    expect(article.title).toBe('Lorem ipsum');
    expect(typeof article.body).toBe('string');
    expect(Array.isArray(article.wordsToEmphasize)).toBe(true);
  }, 15000);
});

describe('throw error message correctly', () => {
  it('article-not-found', async () => {
    expect.assertions(1);

    await expect(getArticle('adfexqa')).rejects.toThrow(
      getErrorMessage('article-not-found')
    );
  });

  it('article-is-disambiguation', async () => {
    expect.assertions(1);

    await expect(getArticle('seo')).rejects.toThrow(
      getErrorMessage('article-is-disambiguation')
    );
  });
});
