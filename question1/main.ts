export function isValidWalk(walk: string[]) {
  if (walk.length != 10) {
    return false;
  }
  let [x, y] = [0, 0];

  for (let step of walk) {
    if (step === "n") x++;
    else if (step === "s") x--;
    else if (step === "e") y++;
    else if (step === "w") y--;
  }

  if (x === 0 && y === 0) {
    return true;
  }
  return false;
}
