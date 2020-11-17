function solution(gems){
  let count = new Set(gems).size; // 보석 종류 개수
  let gemMap = new Map(); // forEach문으로 돌면서 각 보석의 위치를 저장할 Map 객체
  let gemLength = []; // 모든 보석을 포함하는 구간들을 저장할 배열
  gems.forEach((gem, i)=> {
    gemMap.delete(gem)
    gemMap.set(gem, i)
    if (gemMap.size === count) {
      // Map 객체는 Symbol.iterator를 가지고 있고
      // gemMap[Symbol.iterator]()를 실행시켜서 반환되는 값의 next()를 실행시키면
      // value와 done이 담긴 객체가 나온다.
      // Map 객체를 순회하면서 담긴 값들을 value에 출력한다.
      // 또한 실제 보석 자리를 저장하기 위해 인덱스를 의미하는 i에 1을 더했다.
      gemLength.push([gemMap.values().next().value + 1, i + 1]);
    }
  })
  gemLength.sort((a,b)=> {
    // 구간의 길이가 같은 경우 더 먼저 온 구간을 출력
    if (a[1] - a[0] === b[1] - b[0]) {
      return a[1] - b[1];
    }
    return (a[1] - a[0]) - (b[1] - b[0]);
  })
  return gemLength[0];
}

console.log(solution([
  "DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"
]));
console.log(solution([
  "AA", "AB", "AC", "AA", "AC"
]));
console.log(solution([
  "XYZ", "XYZ", "XYZ"
]));
console.log(solution([
  "ZZZ", "YYY", "NNNN", "YYY", "BBB"
]));

// cf) 효율성 실패
// function solution(gems) {
//   let answer = [1, gems.length];
//   const gemsCount = new Set(gems).size;
//   let startPointer = 0;
//   let endPointer = 1;
//   // endPointer === gems.length 가 될 때까지 아래 동작 반복 수행
//   while (endPointer < gems.length) {
//     // (1) endPointer 1씩 증가시키면서 모든 종류의 보석 포함하는 구간 설정
//     while (endPointer <= gems.length) {
//       if (new Set(gems.slice(startPointer, endPointer)).size === gemsCount) {
//         if (answer[1] - answer[0]  > endPointer - (startPointer + 1)) {
//           answer = [startPointer, endPointer];
//         }
//         break;
//       }
//       endPointer += 1;
//     }
//     // (2) 구간 설정 후 모든 종류의 보석 포함하는 짧은 구간 나올 때까지 startPointer 1씩 증가
//     while (startPointer <= gems.length) {
//       if (new Set(gems.slice(startPointer, endPointer)).size !== gemsCount) {
//         if (answer[1] - answer[0]  > endPointer - startPointer) {
//           answer = [startPointer, endPointer];
//         }
//         break;
//       }
//       startPointer += 1;
//     }
//   }
//   return answer;
// }