# weighted-randomness

Generate a weighted random function from a frequency map. Every time this function is called, it'll return one of the strings inside `freqMap`.

## Observations

- `freqMap` parameter is an object which:
  - _keys_ are integers or strings containing integers (i.e. `3` & `'3'` are interchangeable)
  - _values_ are string arrays
- weight of each individual word is equal to `tier.length / weight`
  - e.g. `2: ['bar', 'baz']` = each word has weight of 1

## Usage

```javascript
import weightedRandomness from 'weighted-randomness';

const randomFn = weightedRandomness({
  1: ['foo'],
  2: ['bar', 'baz'], // 2 times more likely than previous
  4: ['qux'], // 2 times more likely than previous, 4 times more likely than first
});

const randomWord1 = randomFn();
const randomWord2 = randomFn();
// ...
```
