import {
  articleType,
  includeType,
  optionsType,
  termsType,
} from './common/types';
import extractSummaryFromBody from './extractSummaryFromBody';
import getArticleBody from './getArticleBody';
import getArticleCategories from './getArticleCategories';
import getArticleLinks from './getArticleLinks';
import getArticleSummary from './getArticleSummary';
import getArticleTerms from './getArticleTerms';
import getMatchingArticlesTitles from './getMatchingArticlesTitles';

const includeDefault: includeType = ['title', 'body'];

const optionsDefaults: optionsType = {
  bodyFormat: 'plaintext',
};

/**
 * Fetch Wikipedia article's resources (e.g. title, body, links...).
 * @param query Search string.
 * @param include Which resources to include in the return object.
 * @param options
 * @returns Object containing requested resources.
 */
async function getWikipediaArticle(
  query: string,
  include: includeType = includeDefault,
  optionsArg?: Partial<optionsType>
): Promise<articleType> {
  if (include.length === 0) include.push(...includeDefault);
  const options = { ...optionsDefaults, ...optionsArg };

  const article: articleType = {};

  if (include.includes('title') && include.includes('related')) {
    const [title, ...related] = await getMatchingArticlesTitles(query);
    article.title = title;
    article.related = related;
  } else if (include.includes('title')) {
    const [title] = await getMatchingArticlesTitles(query);
    article.title = title;
  } else if (include.includes('related')) {
    const [, ...related] = await getMatchingArticlesTitles(query);
    article.related = related;
  }

  // API calls to `action=query` using `query` instead of `article.title`
  // are allowed because `redirects` parameter is being used
  const titleQuery = article.title || query;

  if (include.includes('body')) {
    article.body = await getArticleBody(
      titleQuery,
      options.bodyFormat,
      article.related || []
    );
  }

  if (include.includes('summary')) {
    const summary = article.body
      ? extractSummaryFromBody(article.body, options.bodyFormat)
      : await getArticleSummary(
          titleQuery,
          options.bodyFormat,
          article.related || []
        );

    article.summary = summary;
  }

  if (include.includes('categories')) {
    const categories = await getArticleCategories(titleQuery);
    article.categories = categories;
  }

  if (include.includes('links')) {
    const links = await getArticleLinks(titleQuery);
    article.links = links;
  }

  const termsToInclude = (
    ['alias', 'label', 'description'] as (keyof termsType)[]
  ).filter((term) => include.includes(term));

  if (termsToInclude.length > 0) {
    const terms = await getArticleTerms(titleQuery, termsToInclude);

    (Object.keys(terms) as (keyof termsType)[]).forEach((term) => {
      article[term] = terms[term];
    });
  }

  return article;
}

export default getWikipediaArticle;
