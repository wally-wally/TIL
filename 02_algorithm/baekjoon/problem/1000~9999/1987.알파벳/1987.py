import sys
sys.stdin = open('input_1987.txt', 'r')

# pypy3로 제출
def DFS(row, col, alpha_cnt):
    global answer
    answer = max(answer, alpha_cnt)
    if alpha_cnt == 26: return
    for i in range(4):
        new_row, new_col = row + dx[i], col + dy[i]
        if 0 <= new_row < R and 0 <= new_col < C:
            alpha_idx = ord(board[new_row][new_col]) - 65
            if not alphabets[alpha_idx]:
                alphabets[alpha_idx] = True
                DFS(new_row, new_col, alpha_cnt + 1)
                alphabets[alpha_idx] = False


dx, dy = (-1, 0, 1, 0), (0, 1, 0, -1)
R, C = map(int, input().split())
board = [[cell for cell in input()] for _ in range(R)]       
alphabets = [False] * 26
answer = 0
alphabets[ord(board[0][0]) - 65] = True
DFS(0, 0, 1)
print(answer)