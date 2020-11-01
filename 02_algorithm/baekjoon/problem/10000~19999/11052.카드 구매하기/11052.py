import sys
sys.stdin = open('input_11052.txt', 'r')

def card(N):
    DP[0], DP[1] = 0, P[1]
    if N <= 1:
        return DP[N]
    for i in range(2, N + 1):
        for j in range(1, i + 1):
            DP[i] = max(DP[i], DP[i - j] + P[j])
    return DP[N]

n = int(input())
DP = [0] * (n + 1)
P = [0] + list(map(int, input().split()))
print(card(n))