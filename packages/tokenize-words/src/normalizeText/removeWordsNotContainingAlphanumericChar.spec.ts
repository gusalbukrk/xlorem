import removeWordsNotContainingAlphanumericChar from './removeWordsNotContainingAlphanumericChar.js';

describe('removeWordsNotContainingAlphanumericChar', () => {
  it('filter out words not containing alphanumeric character(s)', () => {
    expect.assertions(1);

    const a = removeWordsNotContainingAlphanumericChar(`%$.-' *!@ ?..=`);
    expect(a).toBe('');
  });
});
