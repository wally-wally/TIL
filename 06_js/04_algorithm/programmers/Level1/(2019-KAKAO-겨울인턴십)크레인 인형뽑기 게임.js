function solution(board, moves) {
    let answer = 0;
    let arraySize = board[0].length;
    let stack = [];
    for (let i = 0; i < moves.length; i++) {
        for (let j = 0; j < arraySize; j++) {
            if (board[j][moves[i] - 1] !== 0) {
                stack.push(board[j][moves[i] - 1]);
                board[j][moves[i] - 1] = 0;
                if (stack.length >= 2) {
                    let stackLen = stack.length;
                    if (stack[stackLen - 1] === stack[stackLen - 2]) {
                        stack.pop();
                        stack.pop();
                        answer += 2;
                    }
                }
                break;
            }
        }
    }
    return answer;
}

console.log(solution([
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 3],
    [0, 2, 5, 0, 1],
    [4, 2, 4, 4, 2],
    [3, 5, 1, 3, 1]
], [1, 5, 3, 5, 1, 2, 1, 4]));