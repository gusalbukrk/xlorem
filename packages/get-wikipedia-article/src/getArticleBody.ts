import { optionsType } from './common/types.js';
import { fetchResource } from './common/utils.js';

type response = {
  extract: string;
};

/**
 * Fetch Wikipedia article body.
 * @param title Wikipedia article title.
 * @param format Which one of the 2 formats available in the Wikipedia API.
 * @param related Wikipedia related articles titles (to recommend in case of error).
 * @returns Wikipedia article body.
 */
async function getArticleBody(
  title: string,
  format: optionsType['bodyFormat']
): Promise<string> {
  const queries = {
    action: 'query',
    prop: 'extracts',
    ...(format === 'plain' && { explaintext: undefined }),
    redirects: undefined,
    titles: encodeURIComponent(title),
  };

  const resp = (await fetchResource(queries)) as unknown as response;

  const body = resp.extract;

  return body;
}

export default getArticleBody;
