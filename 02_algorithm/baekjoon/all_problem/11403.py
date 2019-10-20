import sys
sys.stdin = open('input_11403.txt', 'r')

def DFS(x, y):
    visit[x][y] = 1
    for k in range(N):
        if not visit[x][k] and arr[y][k]:
            DFS(x, k)

N = int(input())
arr = [list(map(int, input().split())) for _ in range(N)]
visit = [[0] * N for _ in range(N)]
for idx in range(N * N):
    i, j = idx // N, idx % N
    if arr[i][j]: DFS(i, j)
for r in range(N):
    for c in range(N):
        print(visit[r][c], end=' ')
    print()