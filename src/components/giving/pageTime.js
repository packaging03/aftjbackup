export function run() {
  var updatedMs = 0,
    updatedS = 0,
    updatedM = 0,
    updatedH = 0;
  if (updatedM === 60) {
    updatedH++;
    updatedM = 0;
  }
  if (updatedS === 60) {
    updatedM++;
    updatedS = 0;
  }
  if (updatedMs === 100) {
    updatedS++;
    updatedMs = 0;
  }
  updatedMs++;

  return {s: updatedS, m: updatedM, h: updatedH};
}
