import sys
sys.stdin = open('input_2167.txt', 'r')

N, M = map(int, input().split())
DP = [[0] * (M + 1) for _ in range(N + 1)]
for r in range(N + 1):
    c = -1
    if r == 0: continue
    for number in [0] + list(map(int, input().split())):
        c += 1
        if c == -1: continue
        DP[r][c] = DP[r][c - 1] + DP[r - 1][c] - DP[r - 1][c - 1] + number

for _ in range(int(input())):
    i, j, x, y = map(int, input().split())
    print(DP[x][y] - DP[x][j - 1] - DP[i - 1][y] + DP[i - 1][j - 1])