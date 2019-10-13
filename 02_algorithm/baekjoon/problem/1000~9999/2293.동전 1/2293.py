import sys
sys.stdin = open('input_2293.txt', 'r')

n, k = map(int, input().split())
coins = [int(input()) for _ in range(n)]
DP = [1] + [0] * k

for cost in coins:
    for i in range(cost, k + 1):
        if i - cost >= 0:
            DP[i] += DP[i - cost]
print(DP[k])