import weightedRandomness from 'weighted-randomness/src/';

import mostCommonStopwordsFreqMap from './mostCommonStopwordsFreqMap.json';

const getRandomStopword = weightedRandomness(mostCommonStopwordsFreqMap);

export default getRandomStopword;
