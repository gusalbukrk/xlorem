import handleCapitalizedLetter from '../../src/normalizeText/handleCapitalizedLetterPrecededByDotOrStringBeginning';

describe('handleCapitalizedLetterPrecededByDotOrStringBeginning', () => {
  it('preserve if acronym', () => {
    expect.assertions(1);

    const x = handleCapitalizedLetter('end. START');
    expect(x).toBe('end. START');
  });

  it('if not acronym, use `getCorrectWordCase` function', () => {
    expect.assertions(3);

    const x = handleCapitalizedLetter('end. Start');
    expect(x).toBe('end. Start');

    const y = handleCapitalizedLetter('start end. Start');
    expect(y).toBe('start end. start');

    const z = handleCapitalizedLetter('Start end. Start');
    expect(z).toBe('Start end. Start');
  });
});
