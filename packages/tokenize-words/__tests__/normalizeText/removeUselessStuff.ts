import removeUselessStuff from '../../src/normalizeText/removeUselessStuff';

describe('removeUselessStuff', () => {
  it('remove most punctuations', () => {
    expect.assertions(1);

    const punctuations = `'"()[]{}<>-–—,;:?!`; // all punctuations except dot

    const preserved = removeUselessStuff(punctuations).replace(/\s+/g, '');
    expect(preserved).toBe("'-");
  });

  it('commas & colons should only be preserved when between numbers', () => {
    expect.assertions(2);

    const x = removeUselessStuff(':81 a:b 7:1 7: Foo:Bar 13:20 :7 foo:bar :5');
    expect(x).toBe('81 ab 7:1 7 FooBar 13:20 7 foobar 5');

    const y = removeUselessStuff(',31 a,b 7, 7,1 Foo,Bar 13,20 ,7 foo,bar 9,');
    expect(y).toBe('31 ab 7 7,1 FooBar 13,20 7 foobar 9');
  });

  it('remove newlines', () => {
    expect.assertions(1);

    const x = removeUselessStuff('\n \n\n');
    expect(x).toBe('   ');
  });

  it('remove stopwords', () => {
    expect.assertions(1);

    const x = removeUselessStuff('the And IN of').replace(/\s+/g, '');
    expect(x).toBe('');
  });

  it('remove space between initials', () => {
    expect.assertions(1);

    // initials are returned surrounded by space
    const x = removeUselessStuff('J. K.  J. R. R.');
    expect(x).toBe(' J.K.  J.R.R. ');
  });
});
