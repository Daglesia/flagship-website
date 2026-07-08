// https://stackoverflow.com/a/49434653
export const randomNormalDistribution = (
  min: number,
  max: number,
  skew: number,
) => {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  num = num / 10.0 + 0.5;
  if (num > 1 || num < 0)
    // resample between 0 and 1 if out of range
    num = randomNormalDistribution(min, max, skew);
  else {
    num = Math.pow(num, skew);
    num *= max - min;
    num += min;
  }
  return num;
};
