def solution(board, moves):
    answer = 0
    array_size = len(board[0])
    stack = []
    for move in moves:
        for idx in range(array_size):
            if board[idx][move - 1] != 0:
                stack.append(board[idx][move - 1])
                board[idx][move - 1] = 0
                if len(stack) >= 2:
                    if stack[-1] == stack[-2]:
                        stack.pop()
                        stack.pop()
                        answer += 2
                break
    return answer


print(solution([[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]], [1,5,3,5,1,2,1,4]))