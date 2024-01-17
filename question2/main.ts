export function findOutlier(integers: number[]): number {
  const evenOdd: number[] = [0, 0];
  let evenOutlier: number = 0;
  let oddOutlier: number = 0;
  for (let i = 0; i < integers.length; i++) {
    if (integers[i] % 2 === 0) {
      evenOdd[0]++;
      evenOutlier = integers[i];
    } else {
      evenOdd[1]++;
      oddOutlier = integers[i];
    }

    const [even, odd] = evenOdd;
    if (even > 1 && odd === 1) {
      return oddOutlier;
    }
    if (odd > 1 && even === 1) {
      return evenOutlier;
    }
  }

  return 0;
}
