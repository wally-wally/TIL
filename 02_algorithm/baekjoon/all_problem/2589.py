import sys
sys.stdin = open('input_2589.txt', 'r')

sys.setrecursionlimit(10**8)
def BFS(r, c):
    distance = 1
    queue = [[r, c]]
    direction = [(-1, 0), (0, +1), (+1, 0), (0, -1)]
    visited = [[False] * M for __ in range(N)]
    visited[r][c] = True
    while True:
        temp_list = []
        for elem in queue:
            pop_element = elem
            visited[pop_element[0]][pop_element[1]] = True
            for i in range(4):
                new_x, new_y = pop_element[0] + direction[i][0], pop_element[1] + direction[i][1]
                if 0 <= new_x < N and 0 <= new_y < M:
                    if arr[new_x][new_y] == 'L' and not visited[new_x][new_y]:
                        temp_list.append([new_x, new_y])
                    visited[new_x][new_y] = True
        queue = []
        if len(temp_list):
            for temp in temp_list:
                queue.append(temp)
            distance += 1
        else:
            return distance

N, M = map(int, input().split())
arr = [[element for element in input()] for _ in range(N)]
result = 0
for row in range(N):
    for col in range(M):
        if arr[row][col] == 'L':
            dis = BFS(row, col)
            result = max(dis, result)
print(result - 1)