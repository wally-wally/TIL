const judgeCircle = (moves) => {
  const directionMap = new Map([
    ['U', [0, -1]],
    ['R', [1, 0]],
    ['D', [0, 1]],
    ['L', [-1, 0]],
  ]);

  const movedRobotPoint = moves.split('').reduce(([x, y], direction) => {
    const [dx, dy] = directionMap.get(direction);
    return [x + dx, y + dy];
  }, [0, 0]);

  return movedRobotPoint[0] === 0 && movedRobotPoint[1] === 0;
}

console.log(judgeCircle('UD'));  // true
console.log(judgeCircle('LL'));  // false
console.log(judgeCircle('RRDD'));  // false
console.log(judgeCircle('LDRRLRUULR'));  // false