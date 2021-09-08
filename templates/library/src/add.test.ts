import add from './add';

describe('calc', () => {
  it('adds', () => {
    expect.assertions(1);

    expect(add(7, 3)).toBe(10);
  });
});
