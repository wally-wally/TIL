import sys
sys.stdin = open('input_2156.txt', 'r')

def grape_juice(N):
    if N <= 2:
        return sum(arr[:N + 1])
    DP[1], DP[2] = arr[1], arr[1] + arr[2]
    for i in range(3, N + 1):
        DP[i] = max(DP[i - 1], DP[i - 3] + arr[i] + arr[i - 1], DP[i - 2] + arr[i])
    return DP[N]

n = int(input())
arr = [0] + [int(input()) for _ in range(n)]
DP = [0 for __ in range(n + 1)]
print(grape_juice(n))