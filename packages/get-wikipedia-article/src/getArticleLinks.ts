import { apiBase } from './constants';

interface getArticleLinksJSON {
  continue: {
    plcontinue: string;
  };
  query: {
    pages: {
      [key: string]: {
        links: { title: string }[];
      };
    };
  };
}

async function getArticleLinks(title: string): Promise<string[]> {
  const escapedTitle = encodeURIComponent(title);
  const requestURL = `${apiBase}&action=query&prop=links&pllimit=500&plnamespace=0&titles=${escapedTitle}`;

  const links: string[] = [];

  let plcontinue: string | undefined;

  /* eslint-disable no-await-in-loop */
  do {
    const url =
      plcontinue === undefined
        ? requestURL
        : `${requestURL}&plcontinue=${plcontinue}`;

    const resp = await fetch(url);
    const json = (await resp.json()) as getArticleLinksJSON;

    links.push(
      ...json.query.pages[Object.keys(json.query.pages)[0]].links.map(
        (obj) => obj.title
      )
    );

    plcontinue =
      json.continue === undefined ? undefined : json.continue.plcontinue;
  } while (plcontinue !== undefined);
  /* eslint-enable no-await-in-loop */

  const linksTokenization = links
    .map((linkTitle) => linkTitle.replace(/["()[\]{}<>,;:?!=]+/g, ''))
    .join(' ')
    .split(' ');

  return linksTokenization;
}

export default getArticleLinks;
