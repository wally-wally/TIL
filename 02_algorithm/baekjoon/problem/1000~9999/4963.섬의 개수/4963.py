import sys
sys.stdin = open('input_4963.txt', 'r')

# 2. BFS (Python3) - 메모리 : 29284[KB], 시간 : 108[ms]
def BFS (row, col):
    queue = [(row, col)]
    while queue:
        elem = queue.pop(0)
        for k in range(8):
            new_row, new_col = elem[0] + dx[k], elem[1] + dy[k]
            if 0 <= new_row < h and 0 <= new_col < w:
                if arr[new_row][new_col]:
                    if not visited[new_row][new_col]:
                        visited[new_row][new_col] = 1
                        queue.append((new_row, new_col))

dx, dy = (-1, -1, 0, 1, 1, 1, 0, -1), (0, 1, 1, 1, 0, -1, -1, -1)
while True:
    w, h = map(int, input().split())
    if w == h == 0: break

    arr = [list(map(int, input().split())) for _ in range(h)]
    visited = [[0] * w for _ in range(h)]

    island_cnt = 0
    for r in range(h):
        for c in range(w):
            if arr[r][c] and not visited[r][c]:
                visited[r][c] = 1
                BFS(r, c)
                island_cnt += 1

    print(island_cnt)

# 1. DFS (pypy3) - 메모리 : 167836[KB], 시간 : 320[ms]
# sys.setrecursionlimit(10**8)
# def DFS (row, col):
#     for k in range(8):
#         new_row, new_col = row + dx[k], col + dy[k]
#         if 0 <= new_row < h and 0 <= new_col < w:
#             if arr[new_row][new_col]:
#                 if not visited[new_row][new_col]:
#                     visited[new_row][new_col] = 1
#                     DFS(new_row, new_col)

# dx, dy = (-1, -1, 0, 1, 1, 1, 0, -1), (0, 1, 1, 1, 0, -1, -1, -1)
# while True:
#     w, h = map(int, input().split())
#     if w == h == 0: break

#     arr = [list(map(int, input().split())) for _ in range(h)]
#     visited = [[0] * w for _ in range(h)]

#     island_cnt = 0
#     for r in range(h):
#         for c in range(w):
#             if arr[r][c]:
#                 if not visited[r][c]:
#                     visited[r][c] = 1
#                     DFS(r, c)
#                     island_cnt += 1

#     print(island_cnt)