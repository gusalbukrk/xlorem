import {
  capitalize,
  last,
  getRandomNumber,
  getRandomArrayElement,
  isNumeric,
  escapeRegExp,
  paramsToObjParam,
} from '../src/utils';

describe('utils functions work correctly', () => {
  it('capitalize', () => {
    expect.assertions(1);

    expect(capitalize('test')).toBe('Test');
  });

  it('last', () => {
    expect.assertions(1);

    expect(last([1, 2, 3])).toBe(3);
  });

  it('getRandomNumber', () => {
    expect.assertions(2);

    expect(getRandomNumber(3, 3)).toBe(3);
    expect(String(getRandomNumber(1, 3))).toMatch(/1|2|3/);
  });

  it('getRandomArrayElement', () => {
    expect.assertions(2);

    expect(getRandomArrayElement([3])).toBe(3);
    expect(String(getRandomArrayElement([1, 2, 3]))).toMatch(/1|2|3/);
  });

  const chars = Array.from({ length: 95 }, (_, index) =>
    String.fromCharCode(index + 32)
  );

  it('isNumeric', () => {
    expect.assertions(1);

    const numericChars = chars.filter((char) => isNumeric(char)).join('');

    expect(numericChars).toBe('$%.0123456789:');
  });

  it('escapeRegExp', () => {
    expect.assertions(1);

    const escapableChars = chars
      .filter((char) => char !== escapeRegExp(char))
      .join('');

    expect(escapableChars).toBe('$()*+.?[\\]^{|}');
  });

  it('paramsToObjParam', () => {
    expect.assertions(5);

    const fn = (x: number, y: number) => x / y;
    const fnObjParam = paramsToObjParam(fn, { x: 3, y: 2 });

    expect(fnObjParam()).toBe(1.5);
    expect(fnObjParam({})).toBe(1.5);
    expect(fnObjParam({ x: 5 })).toBe(2.5);
    expect(fnObjParam({ y: 3 })).toBe(1);
    expect(fnObjParam({ y: 4, x: 10 })).toBe(2.5);
  });
});
