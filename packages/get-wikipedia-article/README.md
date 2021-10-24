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

### Optional parameters

- `includes` = array containing which resources to fetch
  - valid options: `title`, `body`, `related`, `summary`, `links` `categories`, `terms`, `description`, `alias`
  - default value: `['title', 'body']`
- `options` = object containing miscellaneous options
  - `bodyFormat` = `plain` (default) or `html`

## Known Issues

## Todo

- replace all `encodeURIComponent` calls with `URL` constructor
- implement warnings about:
  - progress (warning when starting to fetch each resource)
  - getArticleTerms doesn't return all terms requested
- add language option
