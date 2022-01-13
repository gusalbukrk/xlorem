import {
  capitalize,
  last,
  getRandomNumber,
  getRandomArrayElement,
  isNumeric,
  escapeRegExp,
  paramsToObjParam,
  reduce,
  isObject,
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

  it('isObject', () => {
    expect.assertions(16);

    // primitives
    expect(isObject('foo')).toStrictEqual(false);
    expect(isObject(123)).toStrictEqual(false);
    expect(isObject(true)).toStrictEqual(false);

    // nullish values
    expect(isObject(undefined)).toStrictEqual(false);
    expect(isObject(null)).toStrictEqual(false);

    // data structures that (under the hook) are objects,
    // but shouldn't be considered as such by the function being tested
    expect(isObject(['foo', 'bar'])).toStrictEqual(false);
    expect(isObject(new Set())).toStrictEqual(false);
    expect(isObject(new Map())).toStrictEqual(false);

    // functions
    expect(isObject(() => true)).toStrictEqual(false);
    expect(isObject(() => false)).toStrictEqual(false);

    // built-ins
    expect(isObject(Math)).toStrictEqual(false);
    expect(isObject(new Date())).toStrictEqual(false);

    class Pet {
      name: string;

      constructor(n: string) {
        this.name = n;
      }
    }

    // objects
    expect(isObject({})).toStrictEqual(true);
    expect(isObject({ foo: 'bar' })).toStrictEqual(true);
    expect(isObject(new Object({ 1: 'foo', 2: 'bar' }))).toStrictEqual(true); // eslint-disable-line no-new-object
    expect(isObject(new Pet('foo'))).toStrictEqual(true); // object w/ custom class
  });
});
