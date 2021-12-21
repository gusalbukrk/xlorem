import add from './add';
import mul from './mul';

const addArr = (...arr: number[]): number =>
  arr.reduce((acc, cur) => add(acc, cur));

const mulArr = (...arr: number[]): number =>
  arr.reduce((acc, cur) => mul(acc, cur));

export { addArr as add, mulArr as mul };
