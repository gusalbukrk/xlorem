import getErrorMessage from '@xlorem/common/src/getErrorMessage';

import tokenizeWordsBase from '../src';

const tokenizeWords = (str: string) => tokenizeWordsBase(str, true);

describe('remove useless stuff', () => {
  it('remove useless sections', () => {
    expect.assertions(1);

    const x = tokenizeWords('foo == == References == bar == See also == baz.');
    expect(x).toStrictEqual(['foo']);
  });

  it('remove word separators, but preserve some symbols', () => {
    expect.assertions(3);

    // test symbols that should be removed
    const x = tokenizeWords('"a()[b]{}<c>,;:d?!\n=e');
    expect(x).toStrictEqual(['abcde']);

    // test symbols that should be replaced with space
    const y = tokenizeWords('foo—bar');
    expect(y).toStrictEqual(['foo', 'bar']);

    const z = tokenizeWords(`"()[]{}<>,;:?!=—-_$%'`);
    expect(z).toStrictEqual(["-_$%'"]);
  });

  it('remove ellipsis', () => {
    expect.assertions(1);

    const x = tokenizeWords('...foo... bar...');
    expect(x).toStrictEqual(['foo', 'bar']);
  });

  it('remove stopwords', () => {
    expect.assertions(1);

    const x = tokenizeWords('The and on.');
    expect(x).toStrictEqual([]);
  });

  it('remove spacing between initials', () => {
    expect.assertions(1);

    const x = tokenizeWords('J. R. R.');
    expect(x).toStrictEqual(['J.R.R.']);
  });

  it('remove word not containing alphanumeric character', () => {
    expect.assertions(1);

    const x = tokenizeWords("%$.-'");
    expect(x).toStrictEqual([]);
  });
});

describe("should word after dot (or at string's beginning) be lowercase or capitalized", () => {
  it("preserve capitalization if it's the only occurrence", () => {
    expect.assertions(2);

    const x = tokenizeWords('Foo');
    expect(x).toStrictEqual(['Foo']);

    const y = tokenizeWords('bar. Foo');
    expect(y).toStrictEqual(['bar', 'Foo']);
  });

  it("convert to lowercase if there's lowercase occurrence", () => {
    expect.assertions(2);

    const x = tokenizeWords('Foo foo');
    expect(x).toStrictEqual(['foo', 'foo']);

    const y = tokenizeWords('foo. Foo');
    expect(y).toStrictEqual(['foo', 'foo']);
  });

  it('preserve uppercase in initials', () => {
    expect.assertions(1);

    const x = tokenizeWords('ABC abc');
    expect(x).toStrictEqual(['ABC', 'abc']);
  });

  it("doesn't matter if word after dot has trailing dot", () => {
    expect.assertions(2);

    const x = tokenizeWords('foo baz. Foo');
    expect(x).toStrictEqual(['foo', 'baz', 'foo']);

    const y = tokenizeWords('foo baz. Foo.');
    expect(y).toStrictEqual(x);
  });
});

describe('preserve, remove or replace dot accordingly', () => {
  it('preserve dot in numeric values, except trailing dot', () => {
    expect.assertions(1);

    const x = tokenizeWords('7.5% 2012. $1.50');
    expect(x).toStrictEqual(['7.5%', '2012', '$1.50']);
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

  it('preserve dot if word starts with dot', () => {
    expect.assertions(1);

    const x = tokenizeWords('.com .NET');
    expect(x).toStrictEqual(['.com', '.NET']);
  });

  it("preserve trailing dot if it's abbreviation, otherwise remove it", () => {
    expect.assertions(4);

    // if there's only one occurrence, isn't abbreviation
    const w = tokenizeWords('abbrev.');
    expect(w).toStrictEqual(['abbrev']);

    // if there's a occurrence without dot, isn't abbreviation
    const x = tokenizeWords('abbrev. abbrev. abbrev');
    expect(x).toStrictEqual(['abbrev', 'abbrev', 'abbrev']);

    const y = tokenizeWords('abbrev. abbrev.');
    expect(y).toStrictEqual(['abbrev.', 'abbrev.']);

    // expect stopwords to be removed
    const z = tokenizeWords('the. And.');
    expect(z).toStrictEqual([]);
  });

  it('replace dot with space if API sent (end of sentence) dot without proper spacing', () => {
    expect.assertions(4);

    const w = tokenizeWords('end.Start');
    expect(w).toStrictEqual(['end', 'Start']);

    // expect stopwords to be removed
    const x = tokenizeWords('the.Start');
    expect(x).toStrictEqual(['Start']);
    const y = tokenizeWords('end.The');
    expect(y).toStrictEqual(['end']);
    const z = tokenizeWords('the.The');
    expect(z).toStrictEqual([]);
  });
});

describe('throw error message correctly', () => {
  it('not-enough-keywords', () => {
    expect.assertions(1);

    expect(() => tokenizeWordsBase('')).toThrow(
      getErrorMessage('not-enough-keywords')
    );
  });
});
