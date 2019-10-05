import sys
sys.stdin = open('input_2294.txt', 'r')

N, K = map(int, input().split())
coins = [int(input()) for _ in range(N)]
coins.sort()
DP = [0] + [10001] * K
for i in range(N):
    for j in range(coins[i], K + 1):
        DP[j] = min(DP[j], DP[j - coins[i]] + 1)

print(-1 if DP[K] == 10001 else DP[K])