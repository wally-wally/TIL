import sys
sys.stdin = open('input.txt', 'r')

def BFS(x, y):
    home_cnt = 0
    dx = [-1, 0, +1, 0]
    dy = [0, +1, 0, -1]
    queue = []
    visited[x][y] = True
    home_cnt += 1
    queue.append([x, y])
    while queue:
        point = queue.pop(0)
        for k in range(4):
            new_x = point[0] + dx[k]
            new_y = point[1] + dy[k]
            if 0 <= new_x <= N - 1 and 0 <= new_y <= N - 1:
                if arr[new_x][new_y] == 1 and not visited[new_x][new_y]:
                    visited[new_x][new_y] = True
                    queue.append([new_x, new_y])
                    home_cnt += 1
    return home_cnt

for _ in range(2):
    N = int(input())

    arr = []
    for a in range(N):
        element = []
        for info in input():
            element.append(int(info))
        arr.append(element)

    visited = [[False] * N for _ in range(N)]

    area_cnt_list = []
    for i in range(N):
        for j in range(N):
            if arr[i][j] == 1:
                if visited[i][j] == False:
                    area_cnt_list.append(BFS(i, j))
    print(len(area_cnt_list))
    for cnt in sorted(area_cnt_list):
        print(cnt)