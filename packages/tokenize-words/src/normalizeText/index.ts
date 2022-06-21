import { reduce } from 'xlorem-common/utils';

import handleCapitalizedLetterPrecededByDotOrStringBeginning from './handleCapitalizedLetterPrecededByDotOrStringBeginning.js';
import preserveRemoveOrReplaceDot from './preserveRemoveOrReplaceDot/index.js';
import removeUselessStuff from './removeUselessStuff.js';
import removeWordsNotContainingAlphanumericChar from './removeWordsNotContainingAlphanumericChar.js';

function normalizeText(text: string): string {
  const normalized = reduce(text, [
    removeUselessStuff,
    handleCapitalizedLetterPrecededByDotOrStringBeginning,
    preserveRemoveOrReplaceDot,
    removeWordsNotContainingAlphanumericChar,
  ]);

  return normalized;
}

export default normalizeText;
