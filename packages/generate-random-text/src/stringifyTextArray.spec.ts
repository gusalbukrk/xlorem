import stringifyTextArray from './stringifyTextArray';

describe('stringifyTextArray', () => {
  const array = [[['foo'], ['bar', 'baz']], [['qux', 'quux']]];

  it("format: 'plain'", () => {
    expect.assertions(1);

    const text = stringifyTextArray(array, 'plain');
    expect(text).toStrictEqual('foo bar baz\nqux quux');
  });

  it("format: 'html'", () => {
    expect.assertions(1);

    const text = stringifyTextArray(array, 'html');
    expect(text).toStrictEqual('<p>foo bar baz</p><p>qux quux</p>');
  });
});
