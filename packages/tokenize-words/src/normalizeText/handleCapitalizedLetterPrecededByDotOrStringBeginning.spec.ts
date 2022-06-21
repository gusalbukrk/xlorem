import handleCapitalizedLetter from './handleCapitalizedLetterPrecededByDotOrStringBeginning.js';

describe('handleCapitalizedLetterPrecededByDotOrStringBeginning', () => {
  it('preserve if acronym', () => {
    expect.assertions(1);

    const a = handleCapitalizedLetter('foo. BAR');
    expect(a).toBe('foo. BAR');
  });

  // if word isn't acronym, use `getCorrectWordCase` function
});
