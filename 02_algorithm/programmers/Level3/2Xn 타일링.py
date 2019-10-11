def solution(n):
    DP = [0] * (n + 1)
    DP[0] = DP[1] = 1
    for i in range(2, n + 1):
        DP[i] = (DP[i - 1] + DP[i - 2]) % 1000000007
    return DP[n]

print(solution(5))