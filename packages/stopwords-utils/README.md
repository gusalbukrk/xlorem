# stopwords-utils

Utilities for working with English stopwords.

## isStopword

```js
import { isStopword } from 'stopwords-utils';

isStopword('the'); // true
isStopword('foo'); // false
```

## getRandomStopword

```js
import { getRandomStopword } from 'stopwords-utils';

getRandomStopword(); // 'and'
getRandomStopword(); // 'the'
getRandomStopword(); // 'of'
```
