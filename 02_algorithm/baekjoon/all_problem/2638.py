import sys
sys.stdin = open('input_2638.txt', 'r')

def BFS():
    melting_idx = []
    queue = [[0, 0]]
    visited = [[False] * M for _ in range(N)]
    while queue:
        pop_elem = queue.pop()
        for i in range(4):
            new_row, new_col = pop_elem[0] + dx[i], pop_elem[1] + dy[i]
            if 0 <= new_row < N and 0 <= new_col < M:
                if cheese_tray[new_row][new_col] == 0:
                    if not visited[new_row][new_col]:
                        queue.append([new_row, new_col])
                        visited[new_row][new_col] = True
                else:
                    cheese_tray[new_row][new_col] += 1
                    if cheese_tray[new_row][new_col] >= 3:
                        melting_idx.append((new_row, new_col))
    return set(melting_idx)


N, M = map(int, input().split())
cheese_tray, cheese_count = [], 0
for _ in range(N):
    cheese_line = list(map(int, input().split()))
    cheese_count += cheese_line.count(1)
    cheese_tray.append(cheese_line)
dx, dy = (-1, 0, 1, 0), (0, 1, 0 ,-1)

time = 0
while True:
    time += 1
    melting_indexes = BFS()
    if cheese_count == len(melting_indexes):
        print(time)
        break
    for idx in range(N * M):
        row, col = idx // M, idx % M
        if (row, col) in melting_indexes:
            cheese_tray[row][col] = 0
        elif cheese_tray[row][col] > 1:
            cheese_tray[row][col] = 1
    cheese_count -= len(melting_indexes)