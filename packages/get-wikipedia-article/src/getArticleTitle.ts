import getErrorMessage from '@xlorem/common/src/getErrorMessage';

import { apiBase } from './constants';

type getArticleTitleJSON = string[][];

async function getArticleTitle(query: string): Promise<string> {
  const encodedQuery = encodeURIComponent(query);
  const requestURL = `${apiBase}&action=opensearch&limit=1&search=${encodedQuery}`;

  const resp = await fetch(requestURL);
  const json = (await resp.json()) as getArticleTitleJSON;
  const title = json[1]?.[0];

  if (title === undefined) {
    throw new Error(getErrorMessage('article-not-found'));
  }

  return title;
}

export default getArticleTitle;