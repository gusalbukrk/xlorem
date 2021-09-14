# get-wikipedia-article

## Installation

- `npm i get-wikipedia-article`

## How to use

### Basic usage

```js
import getWikipediaArticle from 'get-wikipedia-article';

(async function () {
  const article = await getWikipediaArticle('harry potter');

  console.log(article);
})();
```

## Known Issues

### bug at tests

- can't add any more test/describe blocks containing api call or api calls at index
- otherwise error:
  - `FetchError: invalid json response body at ... reason: Unexpected token < in JSON at position 0`
- it's probably a bug in a third-party package (e.g. `cross-fetch`, `jest`...)
- **after** fix:
  - move disambiguation error from getArticleBody, getArticleSummary up to index

## Todo

- implement warnings about:
  - progress (warning when starting to fetch each resource);
  - getArticleTerms doesn't return all terms requested
- add language option
