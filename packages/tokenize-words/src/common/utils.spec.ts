import { getCorrectWordCase } from './utils';

describe('getCorrectWordCase', () => {
  it('preserve capitalization if capitalized word exists in text not being preceded by dot', () => {
    // convert to lowercase only if both are true:
    //   - text contain word in lowercase
    //   - capitalized word not preceded by dot doesn't occurs in text
    // otherwise, keep capitalized

    expect.assertions(10);

    // if there's lowercase occurrence
    const a = getCorrectWordCase('Foo', 'baz foo bar. Foo');
    expect(a).toBe('foo');
    const b = getCorrectWordCase('Foo', 'foo bar. Foo');
    expect(b).toBe('foo');
    const c = getCorrectWordCase('Foo', 'bar. Foo foo');
    expect(c).toBe('foo');
    const d = getCorrectWordCase('Foo', 'foo. Foo');
    expect(d).toBe('foo');

    // if there's `capitalized not preceded by dot` occurrence
    const e = getCorrectWordCase('Foo', 'baz Foo bar. Foo');
    expect(e).toBe('Foo');
    const f = getCorrectWordCase('Foo', 'Foo baz. Foo');
    expect(f).toBe('Foo');
    const g = getCorrectWordCase('Foo', 'baz. Foo Foo');
    expect(g).toBe('Foo');
    const h = getCorrectWordCase('Foo', 'Foo. Foo');
    expect(h).toBe('Foo');

    // if there's both lowercase and `capitalized not preceded by dot` occurrence
    const i = getCorrectWordCase('Foo', 'Foo foo bar. Foo');
    expect(i).toBe('Foo');

    // if there's no other occurrence in text
    const j = getCorrectWordCase('Foo', 'bar. Foo');
    expect(j).toBe('Foo');
  });
});
