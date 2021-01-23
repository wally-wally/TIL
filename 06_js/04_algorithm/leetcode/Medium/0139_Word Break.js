/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
const wordBreak = (s, wordDict) => {
  const STRING_LENGTH = s.length;
  const queue = [0];
  const checked = [];
  // BFS 알고리즘을 이용해서 구현
  while (queue.length > 0) {
    const START_IDX = queue.shift();
    if (!checked.includes(START_IDX)) {
      checked.push(START_IDX);
      for (let idx = START_IDX + 1; idx <= STRING_LENGTH; idx += 1) {
        const PARTIAL_STRING = s.slice(START_IDX, idx);
        if (wordDict.includes(PARTIAL_STRING)) {
          queue.push(idx);
          // wordDict 안에 부분 문자열이 있는지 검사할 때 idx 값이 마지막 인덱스 번호이면
          // wordDict의 문자열들로 s를 남김 없이 모두 자를 수 있다는 의미
          if (idx === STRING_LENGTH) {
            return true;
          }
        }
      }
    }
  }
  return false;
};

wordBreak('leetcode', ['leet', 'code']);
