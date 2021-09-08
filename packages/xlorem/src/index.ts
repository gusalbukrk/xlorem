import getArticle from 'get-wikipedia-article/src/index';

async function main() {
  const article = await getArticle('harry potter');

  console.log(article);
}

main()
  .then()
  .catch((e) => console.log(e));
