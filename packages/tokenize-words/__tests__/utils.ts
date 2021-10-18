// import { getCorrectWordCase as getCorrectWordCaseBase } from '../src/common/utils';
import { getCorrectWordCase } from '../src/common/utils';

describe('getCorrectWordCase', () => {
  it('preserve capitalization if capitalized word exists in text not being preceded by dot', () => {
    // convert to lowercase only if both are true:
    //   - text contain word in lowercase
    //   - capitalized word not preceded by dot doesn't occurs in text
    // otherwise, keep capitalized

    expect.assertions(8);

    // if there's lowercase occurrence
    const a = getCorrectWordCase('Foo', 'foo bar. Foo');
    expect(a).toBe('foo');
    const b = getCorrectWordCase('Foo', 'bar. Foo foo');
    expect(b).toBe('foo');
    const c = getCorrectWordCase('Foo', 'foo. Foo');
    expect(c).toBe('foo');

    // if there's capitalized not preceded by dot occurrence
    const d = getCorrectWordCase('Foo', 'Foo baz. Foo');
    expect(d).toBe('Foo');
    const e = getCorrectWordCase('Foo', 'baz. Foo Foo');
    expect(e).toBe('Foo');
    const f = getCorrectWordCase('Foo', 'Foo. Foo');
    expect(f).toBe('Foo');

    // if there's both lowercase and capitalized not preceded by dot occurrence
    const g = getCorrectWordCase('Foo', 'Foo foo bar. Foo');
    expect(g).toBe('Foo');

    // if there's no other occurrence in text
    const h = getCorrectWordCase('Foo', 'bar. Foo');
    expect(h).toBe('Foo');
  });
});
