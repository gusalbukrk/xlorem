import weightedRandomness from 'weighted-randomness/src/';

import mostCommonStopwordsFreqMap from './mostCommonStopwordsFreqMap.json';
import stopwords from './stopwords.json';

function isStopword(word: string): boolean {
  return stopwords.includes(word.toLowerCase());
}

const getRandomStopword = weightedRandomness(mostCommonStopwordsFreqMap);

export { isStopword, getRandomStopword };
