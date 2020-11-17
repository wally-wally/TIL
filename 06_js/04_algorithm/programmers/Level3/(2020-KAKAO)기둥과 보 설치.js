const hasElementInSet = (set, element) => set.has(element.join('-'));

function solution(n, build_frame) {
  const checkConstructFrame = answer => {
    for (const frame of answer) {
      const [x, y, a] = frame.split('-').map(v => Number(v));
      if (a === 0) {
        if (y === 0 || hasElementInSet(answer, [x - 1, y, 1]) || hasElementInSet(answer, [x, y, 1]) || hasElementInSet(answer, [x, y - 1, 0])) {
          continue
        } else {
          return false
        }
      } else if (a === 1) {
        if (hasElementInSet(answer, [x, y - 1, 0]) || hasElementInSet(answer, [x + 1, y - 1, 0]) || (hasElementInSet(answer, [x - 1, y, 1]) && hasElementInSet(answer, [x + 1, y, 1]))) {
          continue
        } else {
          return false
        }
      }
    }
    return true
  }

  let answer = new Set();
  for (const frame of build_frame) {
    const [x, y, a, b] = frame;

    const toStringFrame = `${x}-${y}-${a}`;

    if (b === 1) {
      answer.add(toStringFrame);
      if (!checkConstructFrame(answer)) {
        answer.delete(toStringFrame);
      }
    } else {
      answer.delete(toStringFrame);
      if (!checkConstructFrame(answer)) {
        answer.add(toStringFrame);
      }
    }
  }
  return Array.from(answer).map(v => v.split('-').map(e => Number(e))).sort((a, b) => {
    if (a[0] === b[0]) {
      if (a[1] === b[1]) {
        return a[2] - b[2];
      }
      return a[1] - b[1];
    }
    return a[0] - b[0];
  })
}

console.log(solution(5, [
  [1, 0, 0, 1],
  [1, 1, 1, 1],
  [2, 1, 0, 1],
  [2, 2, 1, 1],
  [5, 0, 0, 1],
  [5, 1, 0, 1],
  [4, 2, 1, 1],
  [3, 2, 1, 1]
]))
console.log(solution(5, [
  [0, 0, 0, 1],
  [2, 0, 0, 1],
  [4, 0, 0, 1],
  [0, 1, 1, 1],
  [1, 1, 1, 1],
  [2, 1, 1, 1],
  [3, 1, 1, 1],
  [2, 0, 0, 0],
  [1, 1, 1, 0],
  [2, 2, 0, 1]
]))