import { articleType } from '@xlorem/common/src/types';

import getArticleBody from './getArticleBody';
import getArticleLinks from './getArticleLinks';
import getArticleTitle from './getArticleTitle';

async function getArticle(query: string): Promise<articleType> {
  const [title, body] = await getArticleBody(await getArticleTitle(query));
  const links = await getArticleLinks(title);

  const article = {
    title,
    body,
    wordsToEmphasize: links,
  };

  return article;
}

export default getArticle;
