import sys
sys.stdin = open('input_9465.txt', 'r')

def sticker(N):
    if N == 1:
        return max(arr[0][1], arr[1][1])
    DP = [[0] * (N + 1) for _ in range(2)]
    DP[0][1], DP[1][1] = arr[0][0], arr[1][0]
    for i in range(2, N + 1):
        DP[0][i] = max(DP[1][i - 1], DP[1][i - 2]) + arr[0][i - 1]
        DP[1][i] = max(DP[0][i - 1], DP[0][i - 2]) + arr[1][i - 1]
    return max(DP[0][N], DP[1][N])

for _ in range(int(input())):
    n = int(input())
    arr = [list(map(int, input().split())) for _ in range(2)]
    print(sticker(n))