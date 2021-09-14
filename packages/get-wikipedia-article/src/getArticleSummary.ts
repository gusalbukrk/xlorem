import { articleIsDisambiguation } from '@xlorem/common/src/errorMessages';

import { fetchResource } from './common/utils';

type response = {
  title: string;
  extract: string;
  pageprops: {
    disambiguation: string;
  };
};

/**
 * Fetch Wikipedia article summary.
 * @param title Wikipedia article title.
 * @param format Which one of the 2 formats available in the Wikipedia API.
 * @param related Wikipedia related articles titles (to recommend in case of error).
 * @throws Error if title points to a disambiguation page.
 * @returns Wikipedia article body.
 */
async function getArticleSummary(
  title: string,
  format: 'html' | 'plaintext',
  related: string[]
): Promise<string> {
  const queries = {
    action: 'query',
    prop: 'extracts|pageprops',
    ppprop: 'disambiguation',
    exintro: undefined,
    redirects: undefined,
    ...(format === 'plaintext' && { explaintext: undefined }),
    titles: encodeURIComponent(title),
  };

  const resp = (await fetchResource(queries)) as unknown as response;

  if (resp.pageprops?.disambiguation !== undefined)
    throw new Error(articleIsDisambiguation(related));

  const summary = resp.extract;

  return summary;
}

export default getArticleSummary;
