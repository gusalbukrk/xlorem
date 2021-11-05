import { optionsType } from './common/types';
import { fetchResource } from './common/utils';

type response = {
  extract: string;
};

/**
 * Fetch Wikipedia article summary.
 * @param title Wikipedia article title.
 * @param format Which one of the 2 formats available in the Wikipedia API.
 * @param related Wikipedia related articles titles (to recommend in case of error).
 * @returns Wikipedia article body.
 */
async function getArticleSummary(
  title: string,
  format: optionsType['bodyFormat']
): Promise<string> {
  const queries = {
    action: 'query',
    prop: 'extracts',
    exintro: undefined,
    redirects: undefined,
    ...(format === 'plain' && { explaintext: undefined }),
    titles: encodeURIComponent(title),
  };

  const resp = (await fetchResource(queries)) as unknown as response;

  const summary = resp.extract;

  return summary;
}

export default getArticleSummary;
