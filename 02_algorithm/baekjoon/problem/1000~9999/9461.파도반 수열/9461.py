import sys
sys.stdin = open('input.txt', 'r')

for _ in range(int(input())):
    N = int(input())
    DP = [1, 1, 1, 1, 2, 2]
    if N < 6:
        print(DP[N])
    else:
        for i in range(6, N + 1):
            DP.append(DP[i - 1] + DP[i - 5])
        print(DP[-1])