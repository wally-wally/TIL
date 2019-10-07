import sys
sys.stdin = open('input_1149.txt', 'r')

def RGB_distance(n):
    if n == 1:
        return min(arr[0])
    for i in range(1, n):
        for j in range(3):
            DP[i][j] = min(DP[i - 1][(j + 1) % 3], DP[i - 1][(j + 2) % 3]) + arr[i][j]
    return min(DP[n - 1])

N = int(input())
arr = [list(map(int, input().split())) for _ in range(N)]
DP = [arr[0]] + [[0, 0, 0] for __ in range(N - 1)]
print(RGB_distance(N))