const moveDirection = {
  'U': [0, 1], 'R': [1, 0], 'D': [0, -1], 'L': [-1, 0]
}

function solution(dirs) {
  let answer = 0;
  let walkedRoads = [];
  let nowDirection = [0, 0];
  for (const dir of dirs) {
    let newDir = [nowDirection[0] + moveDirection[dir][0], nowDirection[1] + moveDirection[dir][1]];
    if (newDir[0] >= -5 && newDir[0] <= 5 && newDir[1] >= -5 && newDir[1] <= 5) {
      let joinedRoad = nowDirection.concat(newDir).join('_');
      let reverseJoinedRoad = newDir.concat(nowDirection).join('_');
      if (!walkedRoads.includes(joinedRoad) && !walkedRoads.includes(reverseJoinedRoad)) {
        answer += 1;
        walkedRoads.push(joinedRoad);
        walkedRoads.push(reverseJoinedRoad);
      }
      nowDirection = newDir;
    }
  }
  return answer;
}

console.log(solution('ULURRDLLU'));
console.log(solution('LULLLLLLU'));