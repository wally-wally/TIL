/**
 * @param {number[][]} A
 * @return {number[][]}
 */
let transpose = function(A) {
  const ARRAY_LENGTH = A.length;
  const ARRAY_LINE_LENGTH = A[0].length;
  
  let answer = [];
  for (let i = 0; i < ARRAY_LINE_LENGTH; i++) {
    let tempLine = [];
    for (let j = 0; j < ARRAY_LENGTH; j++) {
      tempLine.push(A[j][i]);
    }
    answer.push(tempLine);
  }
  return answer;
};
