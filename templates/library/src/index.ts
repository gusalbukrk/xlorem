import { reduce } from 'lodash-es';

import add from './add';
import mul from './mul';

const addArr = (...arr: number[]): number => reduce(arr, add, 0);

const mulArr = (...arr: number[]): number => reduce(arr, mul, 1);

export { addArr as add, mulArr as mul };
