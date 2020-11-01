import sys
sys.stdin = open('input_18242.txt', 'r')

N, M = map(int, input().split())
board = [[cell for cell in input()] for _ in range(N)]

# 시작 지점 찾기
start_point = (0, 0)
break_var = 0
for r in range(N):
    if break_var:
        break
    for c in range(M):
        if board[r][c] == '#':
            start_point = (r, c)
            break_var = 1
            break

# 종료 지점 찾기
end_point = (0, 0)
break_var = 0
for r in range(N - 1, -1, -1):
    if break_var:
        break
    for c in range(M - 1, -1, -1):
        if board[r][c] == '#':
            end_point = (r, c)
            break_var = 1
            break

finsih_var = 0
answer = 'DOWN'

# LEFT 확인
for r in range(start_point[0], end_point[0] + 1):
    if board[r][start_point[1]] == '.':
        answer = 'LEFT'
        finsih_var = 1
        break

# RIGHT 확인
if not finsih_var:
    for r in range(start_point[0], end_point[0] + 1):
        if board[r][end_point[1]] == '.':
            answer = 'RIGHT'
            finsih_var = 1
            break

# UP 확인
if not finsih_var:
    for c in range(start_point[1], end_point[1] + 1):
        if board[start_point[0]][c] == '.':
            answer = 'UP'
            finsih_var = 1
            break

print(answer)