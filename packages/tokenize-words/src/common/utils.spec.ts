import { getCorrectWordCase } from './utils';

describe('getCorrectWordCase', () => {
  it('preserve capitalization if capitalized word exists in text not being preceded by dot', () => {
    // convert to lowercase only if both are true:
    //   - text contain word in lowercase
    //   - capitalized word not preceded by dot or string beginning doesn't occurs in text
    // otherwise, keep capitalized

    expect.assertions(9);

    // if there's lowercase occurrence
    const a = getCorrectWordCase('Foo', 'baz foo bar. Foo');
    expect(a).toBe('foo');
    const b = getCorrectWordCase('Foo', 'foo bar. Foo');
    expect(b).toBe('foo');
    const c = getCorrectWordCase('Foo', 'bar. Foo foo');
    expect(c).toBe('foo');
    const d = getCorrectWordCase('Foo', 'foo. Foo');
    expect(d).toBe('foo');

    // if there's `capitalized not preceded by dot or string beginning` occurrence
    const e = getCorrectWordCase('Foo', 'baz Foo bar. Foo');
    expect(e).toBe('Foo');
    const f = getCorrectWordCase('Foo', 'baz. Foo Foo');
    expect(f).toBe('Foo');

    // if the only other capitalized occurrence is in the beginning of string
    const g = getCorrectWordCase('Foo', 'Foo foo. Foo');
    expect(g).toBe('foo');

    // if there's both lowercase and `capitalized not preceded by dot or str beginning` occurrence
    const h = getCorrectWordCase('Foo', 'Bar Foo foo. Foo');
    expect(h).toBe('Foo');

    // if there's no other occurrence in text
    const i = getCorrectWordCase('Foo', 'bar. Foo');
    expect(i).toBe('Foo');
  });
});
