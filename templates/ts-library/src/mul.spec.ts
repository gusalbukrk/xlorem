import add from './mul.js';

describe('calc', () => {
  it('mul', () => {
    expect.assertions(1);

    expect(add(7, 3)).toBe(21);
  });
});
