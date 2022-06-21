import { getRangeRespectiveFreqMapWeight } from './getFreqMapRandomTier.js';
import getWeightsAndRangesFromFreqMap from './getWeightsAndRangesFromFreqMap.js';

// testing helper functions, main function can't be tested because its randomness
describe('weightedRandomness helper functions', () => {
  it('getWeightsAndRangesFromFreqMap', () => {
    expect.assertions(1);

    const freqMap = { 1: ['foo'], 2: ['bar'], 3: ['baz'], 4: ['qux', 'quux'] };

    const x = getWeightsAndRangesFromFreqMap(freqMap);
    expect(x).toStrictEqual([
      [1, 2, 3, 4],
      [1, 3, 6, 10],
    ]);
  });

  it('getRangeRespectiveFreqMapWeight', () => {
    expect.assertions(1);

    const x = getRangeRespectiveFreqMapWeight(5, [1, 2, 3], [1, 3, 6]);
    expect(x).toBe(3);
  });
});
