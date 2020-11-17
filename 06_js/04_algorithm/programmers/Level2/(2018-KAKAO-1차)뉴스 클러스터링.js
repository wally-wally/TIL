function extractElement(originalString) {
  const reg = /[^a-zA-Z]/;
  let subSet = [];
  for (let i = 0; i < originalString.length - 1; i++) {
    if (!reg.test(originalString.slice(i, i + 2))) {
      subSet.push(originalString.slice(i, i + 2).toLowerCase());
    }
  }
  return subSet;
}

function solution(str1, str2) {
  // 교집합 원소 개수, 합집합 원소 개수
  let intersectionCount = 0;
  let unionCount = 0;
  // str1, str2 두 글자씩 묶어서 다중집합의 원소 추출
  const subSet1 = extractElement(str1);
  const subSet2 = extractElement(str2);
  // 두 다중집합 모두 원소가 없는 경우 65536을 return
  if (subSet1.length === 0 && subSet2.length === 0) {
    return 65536;
  }
  // 두 다중집합 중 하나의 집합 원소가 없는 경우 결과는 항상 0임
  if (subSet1.length === 0 || subSet2.length === 0) {
    return 0;
  }
  // 교집합, 합집합 계산
  let totalSubSet = new Set([...subSet1, ...subSet2]);
  for (let elem of totalSubSet) {
    const elementCount1 = subSet1.filter(e => e === elem).length;
    const elementCount2 = subSet2.filter(e => e === elem).length;
    intersectionCount += Math.min(elementCount1, elementCount2);
    unionCount += Math.max(elementCount1, elementCount2);
  }
  return parseInt((intersectionCount / unionCount) * 65536);
}

console.log(solution('FRANCE', 'french'));
console.log(solution('handshake', 'shake hands'));
console.log(solution('aa1+aa2', 'AAAA12'));
console.log(solution('E=M*C^2', 'e=m*c^2'));