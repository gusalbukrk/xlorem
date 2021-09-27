import { reduce } from '@xlorem/common/src/utils';

import handleCapitalizedLetterPrecededByDotOrStringBeginning from './handleCapitalizedLetterPrecededByDotOrStringBeginning';
import preserveRemoveOrReplaceDot from './preserveRemoveOrReplaceDot';
import removeUselessStuff from './removeUselessStuff';

function normalizeText(text: string): string {
  const normalized = reduce(text, [
    removeUselessStuff,
    handleCapitalizedLetterPrecededByDotOrStringBeginning,
    preserveRemoveOrReplaceDot,
  ]);

  return normalized;
}

export default normalizeText;
