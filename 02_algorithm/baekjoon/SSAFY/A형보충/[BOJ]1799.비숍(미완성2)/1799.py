import sys
sys.stdin = open('input_1799.txt', 'r')

import copy
sys.setrecursionlimit(10**7)

def bishop(x, y, val, board, chk_var):
    global result_a, result_b
    if x == N:
        if not chk_var:
            if val >= result_a:
                result_a = val
            return
        else:
            if val >= result_b:
                result_b = val
            return
    if board[x][y] == 1:
        board[x][y] = 2
        check_direction = [(-1, -1), (-1, +1), (+1, +1), (+1, -1)]
        for posi in range(4):
            a = 1
            while True:
                new_x, new_y = x + a * check_direction[posi][0], y + a * check_direction[posi][1]
                if 0 <= new_x < N and 0 <= new_y < N:
                    if board[new_x][new_y] == 1:
                        board[new_x][new_y] = 2
                    a += 1
                else:
                    break
        print(x, y)
        val += 1
    else:
        return
    while True:
        y += 2
        if y <= N - 1:
            if not visited[x][y]:
                visited[x][y] = True
                bishop(x, y, val, board, chk_var)
                visited[x][y] = False
        else:
            x += 1
            if not chk_var:
                if x % 2 == 1:
                    y = 1
                else:
                    y = 0
            else:
                if x % 2 == 1:
                    y = 0
                else:
                    y = 1
            if x == N:
                bishop(x, y, val, board, chk_var)
                return
            elif not visited[x][y]:
                visited[x][y] = True
                bishop(x, y, val, board, chk_var)
                visited[x][y] = False


N = int(input())
arr = [list(map(int, input().split())) for _ in range(N)]
original_arr = copy.deepcopy(arr)
visited = [[False] * N for __ in range(N)]
result_a, result_b = 0, 0
black_var, white_var = 0, 1
black_start_x, black_start_y, white_start_x, white_start_y = 0, 0, 0, 0
# 시작 위치 찾기
escape_var, white_complete, black_complete = 0, 0, 0
color_check = 1 # 0 : 흑, 1 : 백
for m in range(N):
    if escape_var == 3: break
    for n in range(N):
        color_check = (color_check + 1) % 2
        if arr[m][n] == 1:
            if color_check:
                if not white_complete:
                    white_start_x, white_start_y = m, n
                    escape_var += 1
                    white_complete += 1
            elif not color_check:
                if not black_complete:
                    black_start_x, black_start_y = m, n
                    escape_var += 2
                    black_complete += 1

# 검은 칸 판단
if escape_var == 2 or escape_var == 3:
    cnt = 0
    bishop(black_start_x, black_start_y, cnt, arr, black_var)
print('-------------')
# 흰색 칸 판단
if escape_var == 1 or escape_var == 3:
    cnt = 0
    bishop(white_start_x, white_start_y, cnt, original_arr, white_var)
print(result_a + result_b)