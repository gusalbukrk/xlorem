import preserveRemoveOrReplaceDot from '../../src/normalizeText/preserveRemoveOrReplaceDot';

describe('preserveRemoveOrReplaceDot', () => {
  it('preserve dot if numeric value', () => {
    expect.assertions(2);

    const x = preserveRemoveOrReplaceDot('1.000.000');
    expect(x).toBe('1.000.000');

    // if there's trailing dot, remove it
    const y = preserveRemoveOrReplaceDot('1.000.000.');
    expect(y).toBe('1.000.000');
  });

  // preserve dot if word containing leading dot occurs more than once
  it('preserve or remove leading dot', () => {
    expect.assertions(3);

    const x = preserveRemoveOrReplaceDot('.foo');
    expect(x).toBe('foo');

    const y = preserveRemoveOrReplaceDot('.foo .foo');
    expect(y).toBe('.foo .foo');

    const z = preserveRemoveOrReplaceDot('.the');
    expect(z).toBe('');
  });

  // preserve dot if word containing trailing dot happens
  // more than once and more often than word without trailing dot
  it('preserve or remove trailing dot', () => {
    expect.assertions(5);

    const a = preserveRemoveOrReplaceDot('foo.');
    expect(a).toBe('foo');

    const b = preserveRemoveOrReplaceDot('foo. foo.');
    expect(b).toBe('foo. foo.');

    const c = preserveRemoveOrReplaceDot('foo. foo. foo');
    expect(c).toBe('foo. foo. foo');

    const d = preserveRemoveOrReplaceDot('foo. foo foo. foo');
    expect(d).toBe('foo foo foo foo');

    const e = preserveRemoveOrReplaceDot('the. the.');
    expect(e).toBe(' ');
  });

  it('replace dot surrounded by lowercase letter and uppercase letter wit space', () => {
    expect.assertions(4);

    const w = preserveRemoveOrReplaceDot('end.Start');
    expect(w).toBe('end Start');

    const x = preserveRemoveOrReplaceDot('the.Start');
    expect(x).toBe('Start');

    const y = preserveRemoveOrReplaceDot('end.The');
    expect(y).toBe('end');

    const z = preserveRemoveOrReplaceDot('the.The');
    expect(z).toBe('');
  });

  it('preserve dot in anything else', () => {
    expect.assertions(2);

    // words with multiple dots
    const x = preserveRemoveOrReplaceDot('F.O.O. f.o.o. google.com.br .foo.');
    expect(x).toBe('F.O.O. f.o.o. google.com.br .foo.');

    // words with dot in the middle that aren't matched previously
    const y = preserveRemoveOrReplaceDot('google.com A.B A.b');
    expect(y).toBe('google.com A.B A.b');
  });
});
