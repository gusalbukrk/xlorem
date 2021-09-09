import stopwords from './stopwords.json'; // https://github.com/6/stopwords-json

function isStopword(word: string): boolean {
  return stopwords.includes(word.toLowerCase());
}

export default isStopword;
