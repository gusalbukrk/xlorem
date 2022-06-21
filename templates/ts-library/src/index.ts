import add from './add.js';
import mul from './mul.js';

const addArr = (...arr: number[]): number =>
  arr.reduce((acc, cur) => add(acc, cur));

const mulArr = (...arr: number[]): number =>
  arr.reduce((acc, cur) => mul(acc, cur));

export { addArr as add, mulArr as mul };
