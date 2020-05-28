import sys
sys.stdin = open('input_2636.txt', 'r')

# 1 python3으로 통과 (140[ms])
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
                    if cheese_tray[new_row][new_col] >= 2:
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
        print(len(melting_indexes))
        break
    for idx in range(N * M):
        row, col = idx // M, idx % M
        if (row, col) in melting_indexes:
            cheese_tray[row][col] = 0
        elif cheese_tray[row][col] > 0:
            cheese_tray[row][col] = 1
    cheese_count -= len(melting_indexes)


# 2 예전에 풀었던 느린 코드 (python3으로 통과했으나 시간이 4000[ms]대)
# def init_air_BFS(r, c):
#     queue = [[r, c]]
#     visited[r][c] = True
#     cheese_tray[r][c] = 2
#     while queue:
#         pop_elem = queue.pop()
#         for i in range(4):
#             new_row, new_col = pop_elem[0] + dx[i], pop_elem[1] + dy[i]
#             if 0 <= new_row < R  and 0 <= new_col < C:
#                 if not visited[new_row][new_col] and cheese_tray[new_row][new_col] == 0:
#                     visited[new_row][new_col] = True
#                     queue.append([new_row, new_col])
#                     cheese_tray[new_row][new_col] = 2

# def air_BFS(r, c):
#     queue = [[r, c]]
#     visited[r][c] = True
#     while queue:
#         row, col = queue.pop()
#         for i in range(4):
#             new_row, new_col = row + dx[i], col + dy[i]
#             if 0 <= new_row < R and 0 <= new_col < C:        
#                 if cheese_tray[new_row][new_col] == 2:
#                     cheese_tray[row][col] = 2
#                 elif cheese_tray[new_row][new_col] == 0:
#                     if not visited[new_row][new_col]:
#                         queue.append([new_row, new_col])
#                         visited[new_row][new_col] = True


# R, C = map(int, input().split())
# cheese_tray, cheese_piece_cnt = [], 0
# for _ in range(R):
#     cheese_line = list(map(int, input().split()))
#     cheese_piece_cnt += cheese_line.count(1)
#     cheese_tray.append(cheese_line)
# visited = [[False] * C for _ in range(R)]
# dx, dy = (-1, 0, 1, 0), (0, 1, 0, -1)

# time, last_remain_cheese = 0, 0

# if not cheese_piece_cnt:
#     print(0)
#     print(0)
# else:
#     init_air_BFS(0, 0)
#     while True:
#         time += 1
#         melting_idx = []

#         for row in range(1, R - 1):
#             for col in range(1, C - 1):
#                 if cheese_tray[row][col] == 1:
#                     for i in range(4):
#                         new_row, new_col = row + dx[i], col + dy[i]
#                         if cheese_tray[new_row][new_col] == 2:
#                             melting_idx.append([row, col])
#                             break
#         cheese_piece_cnt -= len(melting_idx)
#         if not cheese_piece_cnt:
#             print(time)
#             print(len(melting_idx))
#             break

#         for melt_idx in melting_idx:
#             cheese_tray[melt_idx[0]][melt_idx[1]] = 2
        
#         for row in range(R):
#             for col in range(C):
#                 if cheese_tray[row][col] == 0:
#                     visited = [[False] * C for _ in range(R)]
#                     air_BFS(row, col)