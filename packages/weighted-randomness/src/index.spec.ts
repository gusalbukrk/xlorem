import { getRangeRespectiveFreqMapWeight } from './getFreqMapRandomTier';
import getWeightsAndRangesFromFreqMap from './getWeightsAndRangesFromFreqMap';

// testing helper functions, main function can't be tested because its randomness
describe('weightedRandomness helper functions', () => {
  it('getWeightsAndRangesFromFreqMap', () => {
    expect.assertions(1);

    const freqMap = { 1: ['foo'], 2: ['bar'], 3: ['baz'], 4: ['qux'] };

    const x = getWeightsAndRangesFromFreqMap(freqMap);
    expect(x).toStrictEqual([
      [1, 2, 3, 4],
      [1, 3, 6, 10],
    ]);
  });

  it('getRangeRespectiveFreqMapWeight', () => {
    expect.assertions(1);

    const x = getRangeRespectiveFreqMapWeight(3, [1, 3, 6], [1, 2, 3]);
    expect(x).toBe(2);
  });
});
