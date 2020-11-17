function solution(arr1, arr2) {
  let answer = [];
  let rowLength = arr1.length;
  let colLength = arr1[0].length;
  for (let i = 0; i < rowLength; i++) {
    let tempArr = [];
    for (let j = 0; j < colLength; j++) {
      tempArr.push(arr1[i][j] + arr2[i][j]);
    }
    answer.push(tempArr);
  }
  return answer;
}

console.log(solution([[1,2],[2,3]], [[3,4],[5,6]]));
console.log(solution([[[1],[2]], [[3],[4]]]));