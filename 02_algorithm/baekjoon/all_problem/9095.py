import sys
sys.stdin = open('input_9095.txt', 'r')

for _ in range(int(input())):
    n = int(input())
    DP = [0, 1, 2, 4] + [0] * (n - 3)
    for i in range(4, n + 1):
        DP[i] = sum(DP[i - 3 : i])
    print(DP[n])