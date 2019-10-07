import sys
sys.stdin = open('input_2193.txt', 'r')

def pinary(n):
    if n <= 2:
        return 1
    for i in range(2, n):
        DP[i] = DP[i - 1] + DP[i - 2]
    return DP[n - 1]

N = int(input())
DP = [1, 1] + [0] * (N - 2)
print(pinary(N))