function getRangeRespectiveFreqMapWeight(
  randomRange: number,
  weights: number[],
  ranges: number[]
): number {
  const index = ranges.findIndex((range) => randomRange <= range);

  const weight = weights[index];

  return weight;
}

export default getRangeRespectiveFreqMapWeight;
