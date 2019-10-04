import sys
sys.stdin = open('input_16234.txt', 'r')

import sys
sys.setrecursionlimit(10**7)

def DFS(x, y):
    global country_count, position_info, people
    country_count += 1
    people += arr[x][y]
    position_info.append([x, y])
    dx, dy = [-1, 0, +1, 0], [0, +1, 0, -1]
    visited[x][y] = True
    for k in range(4):
        new_x, new_y = x + dx[k], y + dy[k]
        if 0 <= new_x < N and 0 <= new_y < N and not visited[new_x][new_y]:
            if L <= abs(arr[new_x][new_y] - arr[x][y]) <= R:
                DFS(new_x, new_y)
    return
    

N, L, R = map(int, input().split())
arr = [list(map(int, input().split())) for _ in range(N)]

move_cnt, end_var = 0, 0
complete_variable = 1

while True:
    if end_var:
        break
    visited = [[False] * N for __ in range(N)]
    complete_variable = 0
    datas = []
    for a in range(N):
        for b in range(N):
            if not visited[a][b]:
                people, country_count = 0, 0
                position_info = []
                DFS(a, b)
                complete_variable = 1
                if len(position_info) >= 2:
                    datas.append([people, country_count, position_info])
    if complete_variable:
        for data in datas:
            if len(data[2]) >= 2:
                break
        else:
            end_var = 1
        if not end_var:  
            for data in datas:
                divide_people = data[0] // data[1]
                for posi_info in data[2]:
                    arr[posi_info[0]][posi_info[1]] = divide_people
            move_cnt += 1
print(move_cnt)