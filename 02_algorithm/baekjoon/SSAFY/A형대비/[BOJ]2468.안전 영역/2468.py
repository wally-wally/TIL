import sys
sys.stdin = open('input.txt', 'r')

def DFS(x, y):
    dx = [-1, 0, +1, 0]
    dy = [0, +1, 0, -1]
    visited[x][y] = 1
    for p in range(4):
        new_x, new_y = x + dx[p], y + dy[p]
        if 0 <= new_x < N and 0 <= new_y < N:
            if not visited[new_x][new_y] and check_list[new_x][new_y] != 0:
                DFS(new_x, new_y)

N = int(input())
arr = [list(map(int, input().split())) for _ in range(N)]
check_list = [[1] * N for __ in range(N)]

height = 0
result_list = []

# 물에 잠기지 않는 특수한 경우부터 처리
no_flood = 0
criteria = arr[0][0]
for m in range(N):
    if no_flood == 1:
        break
    for n in range(N):
        if criteria != arr[m][n]:
            no_flood = 1
            break
if not no_flood:
    print(1)
    
elif no_flood == 1:
    while True:
        one_count = 0
        region_cnt = 0
        height += 1
        visited = [[0] * N for k in range(N)]
        for a in range(N):
            for b in range(N):
                if height >= arr[a][b]:
                    check_list[a][b] = 0 # 0 이 그 높이에서 잠겼다는 의미
        for c in range(N):
            for d in range(N):
                if not visited[c][d] and check_list[c][d] != 0:
                    region_cnt += 1
                    DFS(c, d)
                elif visited[c][d]:
                    one_count += 1
        result_list.append(region_cnt)
        if not region_cnt:
            break
    print(max(result_list))