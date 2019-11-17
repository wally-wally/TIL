import sys
sys.stdin = open('input_17069.txt', 'r')

N = int(input())
home = [[0] * (N + 1)] + [[0] + list(map(int, input().split())) for _ in range(N)]
DP = [[[0] * 3 for _ in range(N + 1)] for _ in range(N + 1)]

DP[1][2][0] = 1
for i in range(1, N + 1):
    for j in range(1, N + 1):
        if j < N and not home[i][j + 1]:
            DP[i][j + 1][0] += DP[i][j][0] + DP[i][j][2]
        if i < N and not home[i + 1][j]:
            DP[i + 1][j][1] += DP[i][j][1] + DP[i][j][2]
        if i < N and j < N and not (home[i+1][j] or home[i][j + 1] or home[i + 1][j + 1]):
            DP[i + 1][j + 1][2] += DP[i][j][0] + DP[i][j][1] + DP[i][j][2]

print(sum(DP[N][N]))