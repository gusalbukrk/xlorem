import add from './add.js';

describe('calc', () => {
  it('adds', () => {
    expect.assertions(1);

    expect(add(7, 3)).toBe(10);
  });
});
