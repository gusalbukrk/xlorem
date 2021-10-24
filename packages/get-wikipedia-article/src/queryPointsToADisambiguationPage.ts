import { fetchResource } from './common/utils';

type response = {
  pageprops?: {
    disambiguation: string;
  };
};

async function queryPointsToADisambiguationPage(
  title: string
): Promise<boolean> {
  const queries = {
    action: 'query',
    prop: 'pageprops',
    ppprop: 'disambiguation',
    redirects: undefined,
    titles: encodeURIComponent(title),
  };

  const resp = (await fetchResource(queries)) as unknown as response;

  const pointsToDisambiguation = resp.pageprops?.disambiguation !== undefined;

  return pointsToDisambiguation;
}

export default queryPointsToADisambiguationPage;
