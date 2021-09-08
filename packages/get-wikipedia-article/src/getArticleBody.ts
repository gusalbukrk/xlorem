import getErrorMessage from '@xlorem/common/src/getErrorMessage';

import { apiBase } from './constants';

interface getArticleBodyJSON {
  query: {
    pages: {
      [key: string]: {
        title: string;
        extract: string;
        pageprops: {
          disambiguation: string;
        };
      };
    };
  };
}

async function getArticleBody(title: string): Promise<string[]> {
  const escapedTitle = encodeURIComponent(title);
  const requestURL = `${apiBase}&action=query&prop=extracts|pageprops&ppprop=disambiguation&explaintext=true&redirects&titles=${escapedTitle}`;

  const resp = await fetch(requestURL);
  const json = (await resp.json()) as getArticleBodyJSON;

  const articles = json.query.pages;
  const articleID = Object.keys(articles)[0];

  if (
    articles[articleID].pageprops &&
    'disambiguation' in articles[articleID].pageprops
  ) {
    throw new Error(getErrorMessage('article-is-disambiguation'));
  }

  // action=opensearch API at `getArticleTitle` may return title with incorrect wording and case
  const { title: correctTitle, extract: body } = articles[articleID];

  return [correctTitle, body];
}

export default getArticleBody;
