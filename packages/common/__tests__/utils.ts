import {
  capitalize,
  last,
  getRandomNumber,
  getRandomArrayElement,
  isNumeric,
  escapeRegExp,
  paramsToObjParam,
  reduce,
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

  // includes basic punctuation, numbers, lowercase & uppercase letters
  const chars = Array.from({ length: 95 }, (_, index) =>
    String.fromCharCode(index + 32)
  );

  it('isNumeric', () => {
    expect.assertions(2);

    const numericChars = chars
      .map((char) => `3${char}`) // symbols are only considered numeric when accompanied by at least one number
      .filter((num) => isNumeric(num))
      .map((num) => num.slice(1))
      .join('');

    expect(numericChars).toBe('$%,.0123456789:');

    const numericArray = ['1,000', '.07', '33.33%', '$10', '$.,%'].filter(
      (el) => isNumeric(el)
    );

    expect(numericArray).toStrictEqual(['1,000', '.07', '33.33%', '$10']);
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

  it('reduce', () => {
    expect.assertions(2);

    const add2 = (x: number) => x + 2;
    const mul2 = (x: number) => x * 2;

    const x = reduce(3, [add2, mul2]);
    expect(x).toBe(10);

    const y = reduce(3, [mul2, add2]);
    expect(y).toBe(8);
  });
});
