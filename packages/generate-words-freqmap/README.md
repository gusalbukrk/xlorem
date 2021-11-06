# generate-words-freqmap

Generate frequency map from array of words.

## Basic Usage

```javascript
import generateFreqMap from 'generate-words-freqmap';

const freqMap = generateFreqMap(['foo', 'bar', 'foo', 'baz']); // { 1: ['bar', 'baz'], 2: ['foo'] }
```
