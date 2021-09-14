import 'cross-fetch/polyfill';

import {
  articleNotFound,
  articleIsDisambiguation,
} from '@xlorem/common/src/errorMessages';

import getWikipediaArticle from '../src';
import { includeType } from '../src/common/types';

const isArrayOfStrings = (arg: unknown) =>
  Array.isArray(arg) && arg.every((el) => typeof el === 'string');

// NOTE: see README's `Known Issues` section

describe('main function', () => {
  it('returns correctly', async () => {
    expect.assertions(10);

    const include = [
      'title',
      'body',
      'related',
      'summary',
      'categories',
      'links',
      'description',
      'alias',
      'label',
    ].sort() as includeType;

    const article = await getWikipediaArticle('lorem ipsum', include);

    expect(Object.keys(article).sort()).toStrictEqual(include);

    expect(article.title).toBe('Lorem ipsum');
    expect(typeof article.body).toBe('string');
    expect(typeof article.summary).toBe('string');
    expect(isArrayOfStrings(article.related)).toBe(true);
    expect(isArrayOfStrings(article.categories)).toBe(true);
    expect(isArrayOfStrings(article.links)).toBe(true);
    expect(isArrayOfStrings(article.description)).toBe(true);
    expect(isArrayOfStrings(article.label)).toBe(true);
    expect(isArrayOfStrings(article.alias)).toBe(true);
  });
});

describe('throws errors correctly', () => {
  it('articleNotFound', async () => {
    expect.assertions(1);

    await expect(getWikipediaArticle('bbyyzzaa')).rejects.toThrow(
      articleNotFound
    );
  });

  it('articleIsDisambiguation without suggestions', async () => {
    expect.assertions(1);

    await expect(getWikipediaArticle('(disambiguation)')).rejects.toThrow(
      articleIsDisambiguation([])
    );
  });

  it('articleIsDisambiguation with suggestions', async () => {
    expect.assertions(1);

    await expect(
      getWikipediaArticle('(disambiguation)', ['title', 'body', 'related'])
    ).rejects.toThrow(
      new RegExp(`^${articleIsDisambiguation([]).split(/(?<=\.)\s/)[0]}`)
    );
  });
});
