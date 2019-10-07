import sys
sys.stdin = open('input_1932.txt', 'r')

def triangle(N):
    DP[0][0] = arr[0][0]
    if N == 1:
        return DP[0][0]
    for i in range(1, N):
        for j in range(i + 1):
            if j == 0:
                DP[i][j] = DP[i - 1][j] + arr[i][j]
            elif j == i:
                DP[i][j] = DP[i - 1][j - 1] + arr[i][j]
            else:
                DP[i][j] = max(DP[i - 1][j - 1], DP[i - 1][j]) + arr[i][j]
    return max(DP[N - 1])

n = int(input())
arr = [list(map(int, input().split())) + [0] * (n - a - 1) for a in range(n)]
DP = [[0] * n for _ in range(n)]
print(triangle(n))