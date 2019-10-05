import sys
sys.stdin = open('input_2583.txt', 'r')

sys.setrecursionlimit(10**8)

def DFS(x, y):
    global area
    arr[x][y] = 1
    area += 1
    for direction in [(-1, 0), (0, +1), (+1, 0), (0, -1)]:
        new_x, new_y = x + direction[0], y + direction[1]
        if 0 <= new_x < M and 0 <= new_y < N:
            if not arr[new_x][new_y]:
                DFS(new_x, new_y)

M, N, K = map(int, input().split())
arr = [[0] * N for _ in range(M)]
for _ in range(K):
    x1, y1, x2, y2 = map(int, input().split())
    for x in range(y1, y2):
        for y in range(x1, x2):
            arr[x][y] = 1
result = []
for x_point in range(M):
    for y_point in range(N):
        if not arr[x_point][y_point]:
            area = 0
            DFS(x_point, y_point)
            result.append(area)
print(len(result))
for n in range(len(result)):
    if n != len(result) - 1:
        print(sorted(result)[n], end=' ')
    else:
        print(sorted(result)[n])