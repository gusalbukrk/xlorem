export function last<T>(arr: T[]): T {
  return arr[arr.length - 1];
}

export function capitalize(word: string): string {
  return word[0].toUpperCase() + word.substring(1);
}

export function isLowercase(str: string): boolean {
  return str === str.toLowerCase();
}

export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomArrayElement<T>(arr: T[]): T {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export function isNumeric(word: string): boolean {
  return /^[\d.:%$]+$/.test(word);
}

export function escapeRegExp(regexpString: string): string {
  return regexpString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// I = fn params interface
// T = Parameters<typeof fn>
// RT = fn return type
export function paramsToObjParam<I, T extends unknown[], RT>(
  fn: (...params: T) => RT,
  defaults: I
): (args?: Partial<I>) => RT {
  return function fnWrapper(args: Partial<I> = {}) {
    return fn(...(Object.values({ ...defaults, ...args }) as T));
  };
}