import sys
sys.stdin = open('input_10844.txt', 'r')

def stair_num(n):
    if n == 1:
        return sum(DP[0])
    for i in range(1, n):
        for j in range(10):
            if j == 0:
                DP[i][j] = DP[i - 1][j + 1]
            elif j == 9:
                DP[i][j] = DP[i - 1][j - 1]
            else:
                DP[i][j] = (DP[i - 1][j - 1] + DP[i - 1][j + 1])
    return sum(DP[n - 1]) % 1000000000

N = int(input())
DP = [[0] + [1] * 9] + [[0] * 10 for _ in range(N - 1)]
print(stair_num(N))