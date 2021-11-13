import stopwords from './stopwords.json';

function isStopword(word: string): boolean {
  return stopwords.includes(word.toLowerCase());
}

export default isStopword;
