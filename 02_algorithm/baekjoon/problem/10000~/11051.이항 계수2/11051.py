import sys
sys.stdin = open('input_11051.txt', 'r')

N, K = map(int, input().split())
DP = [[0 for _ in range(N + 1)] for __ in range(N + 1)]
DP[1][0] = DP[1][1] = 1
for i in range(2, N + 1):
    for j in range(i + 1):
        DP[i][j] = 1 if i == j or j == 0 else (DP[i - 1][j - 1] + DP[i - 1][j]) % 10007
print(DP[N][K])