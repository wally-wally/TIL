import sys
sys.stdin = open('input_11057.txt', 'r')

N = int(input())
DP = [[0] * 10 for _ in range(N + 1)]
DP[1] = [1] * 10

for i in range(2, N + 1):
    for j in range(10):
        for k in range(j + 1):
            DP[i][j] += DP[i - 1][k]
        DP[i][j] %= 10007
result = 0
for i in range(10):
    result += DP[N][i]
print(result % 10007)