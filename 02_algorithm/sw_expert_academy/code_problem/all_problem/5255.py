import sys
sys.stdin = open('input_5255.txt', 'r')

for tc in range(int(input())):
    N = int(input())
    DP = [0, 1, 3, 6] + [0]* (N - 3)
    if N <= 3:
        print('#{} {}'.format(tc + 1, DP[N]))
    else:
        for i in range(4, N + 1):
            DP[i] = (DP[i - 1] + 2 * DP[i - 2] + DP[i - 3])
        print('#{} {}'.format(tc + 1, DP[N]))