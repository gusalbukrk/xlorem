import { notEnoughKeywords } from '@xlorem/common/src/errorMessages';

import tokenizeWordsBase from '../src';

const tokenizeWords = (str: string) => tokenizeWordsBase(str, true);

describe('removeUselessStuff', () => {
  it('punctuations', () => {
    expect.assertions(3);

    const punctuationsToBeRemoved = `"()[]{}<>–—,;:?!\n`; // any other symbol will be preserved

    // symbols below will only be preserved if inside word (at any location);
    // if alone or together with other non-alphanumeric symbols, will be removed
    const somePunctuationsToBePreserved = `-_'%$@#&*+/\\`;

    const punctuationsPreserved = tokenizeWords(
      punctuationsToBeRemoved +
        somePunctuationsToBePreserved
          .split('')
          .map((symbol) => `foo${symbol}`)
          .join(' ')
    )
      .map((word) => word.replace('foo', ''))
      .filter((word) => word !== '')
      .sort();

    expect(punctuationsPreserved).toStrictEqual(
      somePunctuationsToBePreserved.split('').sort()
    );

    // preserve colon only if ratio (colon surrounded by numbers)
    const wordsWithColonPreserved = tokenizeWords(
      'a:b 4:3 Foo:Bar baz:Qux 1333:37'
    ).filter((word) => word.includes(':'));

    expect(wordsWithColonPreserved).toStrictEqual(['4:3', '1333:37']);

    // remove multiple dots and ellipse character
    const multipleDotsRemoved = tokenizeWords('Foo... bar… ..baz qux....');
    expect(multipleDotsRemoved).toStrictEqual(['Foo', 'bar', 'baz', 'qux']);
  });

  it('stopwords', () => {
    expect.assertions(1);

    const x = tokenizeWords('The and is, IN on.');
    expect(x).toStrictEqual([]);
  });

  it('spacing between initials', () => {
    expect.assertions(1);

    const x = tokenizeWords('J. K. and J. R. R.');
    expect(x).toStrictEqual(['J.K.', 'J.R.R.']);
  });
});

describe('handleCapitalizedLetterPrecededByDotOrStringBeginning', () => {
  it("preserve capitalization if there's no other occurrence", () => {
    expect.assertions(1);

    const x = tokenizeWords('bar. Foo');
    expect(x).toStrictEqual(['bar', 'Foo']);
  });

  it('preserve capitalization when textHasCapitalizedWordNotPrecededByDot or !textContainLowercaseWord', () => {
    expect.assertions(2);

    // textHasCapitalizedWordNotPrecededByDot takes precedence over !textContainLowercaseWord
    const y = tokenizeWords('bar. Foo foo Foo');
    expect(y).toStrictEqual(['bar', 'Foo', 'foo', 'Foo']);

    // convert to lowercase if there's lowercase occurrence
    const x = tokenizeWords('bar. Foo foo');
    expect(x).toStrictEqual(['bar', 'foo', 'foo']);
  });

  it("doesn't matter if word after dot has trailing dot", () => {
    expect.assertions(3);

    const x = tokenizeWords('bar. Foo.');
    expect(x).toStrictEqual(['bar', 'Foo']);

    const y = tokenizeWords('bar. Foo. foo Foo');
    expect(y).toStrictEqual(['bar', 'Foo', 'foo', 'Foo']);

    const z = tokenizeWords('foo baz. Foo.');
    expect(z).toStrictEqual(['foo', 'baz', 'foo']);
  });

  it('preserve capitalization in acronyms', () => {
    expect.assertions(1);

    const x = tokenizeWords('nasa end. NASA');
    expect(x).toStrictEqual(['nasa', 'end', 'NASA']);
  });
});

describe('preserveRemoveOrReplaceDot', () => {
  it('preserve dot in numeric values; remove any trailing dot/comma', () => {
    expect.assertions(1);

    const x = tokenizeWords('7.5% 2012. 9,99 $1.50 1,000,000,');
    expect(x).toStrictEqual(['7.5%', '2012', '9,99', '$1.50', '1,000,000']);
  });

  it('preserve dots in words containing multiple dots', () => {
    expect.assertions(1);

    const x = tokenizeWords('google.com.br U.S.');
    expect(x).toStrictEqual(['google.com.br', 'U.S.']);
  });

  it("preserve dot if it's followed by lowercase letter", () => {
    expect.assertions(1);

    const x = tokenizeWords('google.com React.js');
    expect(x).toStrictEqual(['google.com', 'React.js']);
  });

  it('preserve or remove leading dot', () => {
    expect.assertions(1);

    // .NET, .org = preserve leading dot because there're multiple instances of each
    // (doesn't matter if text contain word without dot)
    // .com = remove completely because "com" is stopword
    // .uk = remove dot because word containing leading dot occurs only once
    const x = tokenizeWords('.NET .org .com .org .uk org .NET');

    expect(x).toStrictEqual(['.NET', '.org', '.org', 'uk', 'org', '.NET']);
  });

  it('preserve or remove trailing dot', () => {
    expect.assertions(6);

    // stopwords should be removed
    const a = tokenizeWords('The. and.');
    expect(a).toStrictEqual([]);

    // if there's only one occurrence, remove dot
    const b = tokenizeWords('foo.');
    expect(b).toStrictEqual(['foo']);

    // if word with dot occurs more often than word without dot, preserve dot
    const c = tokenizeWords('foo. foo.');
    expect(c).toStrictEqual(['foo.', 'foo.']);
    const d = tokenizeWords('foo. foo foo.');
    expect(d).toStrictEqual(['foo.', 'foo', 'foo.']);

    // if word with dot occurs more often or at the same
    // rate as world without dot, remove dot
    const e = tokenizeWords('foo. foo');
    expect(e).toStrictEqual(['foo', 'foo']);
    const f = tokenizeWords('foo foo. foo');
    expect(f).toStrictEqual(['foo', 'foo', 'foo']);
  });

  it("replace dot with space if it's preceded and followed by lowercase letters and numbers", () => {
    expect.assertions(4);

    const w = tokenizeWords('foo.Bar 2010.Baz qux.37');
    expect(w).toStrictEqual(['foo', 'Bar', '2010', 'Baz', 'qux', '37']);

    // expect stopwords to be removed
    const x = tokenizeWords('the.Start');
    expect(x).toStrictEqual(['Start']);
    const y = tokenizeWords('word.The');
    expect(y).toStrictEqual(['word']);
    const z = tokenizeWords('and.The');
    expect(z).toStrictEqual([]);
  });
});

describe('main function', () => {
  it('filter out words not containing alphanumeric character(s)', () => {
    expect.assertions(1);

    const x = tokenizeWords(`%$.-' *!@ ?..=`);
    expect(x).toStrictEqual([]);
  });

  it('throw error not-enough-keywords', () => {
    expect.assertions(1);

    expect(() => tokenizeWordsBase('')).toThrow(notEnoughKeywords);
  });
});
