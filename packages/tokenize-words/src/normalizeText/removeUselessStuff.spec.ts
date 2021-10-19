import removeUselessStuff from './removeUselessStuff';

describe('removeUselessStuff', () => {
  it('remove most punctuations', () => {
    expect.assertions(1);

    const punctuations = `'"()[]{}<>-–—,;:?!…`; // contains all 15 english punctuations except dot

    const preserved = removeUselessStuff(punctuations).replace(/\s+/g, '');

    expect(preserved).toBe("'-");
  });

  it("preserve commas & colons only when they're surrounded by numbers", () => {
    expect.assertions(2);

    const a = removeUselessStuff(':81 a:b 7:1 7: Foo:Bar 13:20 :7 foo:bar :5');
    expect(a).toBe('81 ab 7:1 7 FooBar 13:20 7 foobar 5');

    const b = removeUselessStuff(',31 a,b 7, 7,1 Foo,Bar 13,20 ,7 foo,bar 9,');
    expect(b).toBe('31 ab 7 7,1 FooBar 13,20 7 foobar 9');
  });

  it('remove multiple dots and ellipse char', () => {
    expect.assertions(1);

    const a = removeUselessStuff('foo... bar… ..baz');
    expect(a).toBe('foo  bar   baz');
  });

  it('remove newlines', () => {
    expect.assertions(1);

    const a = removeUselessStuff('\n \n\n');
    expect(a).toBe('   ');
  });

  it('remove stopwords', () => {
    expect.assertions(1);

    const a = removeUselessStuff('the And IN of').replace(/\s+/g, '');
    expect(a).toBe('');
  });

  it('remove space between initials', () => {
    expect.assertions(1);

    // initials are returned surrounded by space
    const a = removeUselessStuff('J. K.  J. R. R.');
    expect(a).toBe(' J.K.  J.R.R. ');
  });
});
