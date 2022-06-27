import { program } from 'commander';
import xlorem from 'xlorem/src';

import 'cross-fetch/dist/node-polyfill';

program
  .name('xlorem')
  .description('feature-rich filler text generator')
  .version('0.0.0')
  .requiredOption('-Q, --query <value>', 'Wikipedia query string')
  .option('-u, --unit <value>', '`paragraphs` or `words`')
  .option(
    '-q, --quantity <number>',
    'integer, defaults to 5 for `paragraphs` and 200 for `words`',
    parseInt
  )
  .option('-f, --format <value>', '`plain` (default) or `html`');

program.parse();

const options = program.opts();

// console.log(options);

(async function () {
  const article = await xlorem(options.query as string, options);

  console.log(article);
})().catch((e) => console.error(e));
