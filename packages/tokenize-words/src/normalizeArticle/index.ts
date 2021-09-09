import fixCapitalizedLetterPrecededByDotOrStringBeginning from './fixCapitalizedLetterPrecededByDotOrStringBeginning';
import preserveRemoveOrReplaceDot from './preserveRemoveOrReplaceDot';
import removeUselessStuff from './removeUselessStuff';

function normalizeArticle(article: string): string {
  return preserveRemoveOrReplaceDot(
    fixCapitalizedLetterPrecededByDotOrStringBeginning(
      removeUselessStuff(article)
    )
  );
}

export default normalizeArticle;
