// testing helper functions, main function can't be tested because its randomness
import getRangeRespectiveFreqMapWeight from '../src/getRangeRespectiveFreqMapWeight';
import getWeightsAndRangesFromFreqMap from '../src/getWeightsAndRangesFromFreqMap';

describe('getWeightsAndRangesFromFreqMap', () => {
  it('builds weights and ranges arrays correctly', () => {
    expect.assertions(1);

    const freqMap = { 1: ['a'], 2: ['b'], 3: ['c'] };
    const x = getWeightsAndRangesFromFreqMap(freqMap);
    expect(x).toStrictEqual([
      [1, 2, 3],
      [1, 3, 6],
    ]);
  });
});

describe('getRangeRespectiveFreqMapWeight', () => {
  it("returns one of the freqMap's weight (key)", () => {
    expect.assertions(1);

    const x = getRangeRespectiveFreqMapWeight(3, [1, 2, 3], [1, 3, 6]);
    expect(x).toBe(2);
  });
});
