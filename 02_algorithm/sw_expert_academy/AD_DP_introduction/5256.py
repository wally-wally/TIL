import sys
sys.stdin = open('input_5256.txt', 'r')

for tc in range(int(input())):
    n, a, b = map(int, input().split())
    DP = [[0] * (n + 1) for _ in range(n + 1)]
    DP[1][0] = DP[1][1] =1
    for i in range(2, n + 1):
        for j in range(i + 1):
            DP[i][j] = 1 if i == j or j == 0 else (DP[i - 1][j - 1] + DP[i - 1][j])
    print('#{} {}'.format(tc + 1, DP[n][a]))