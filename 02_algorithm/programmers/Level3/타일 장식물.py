def solution(N):
    DP = [0] * (N + 1)
    DP[1] = DP[2] = 1
    if N == 1:
        return 4
    elif N == 2:
        return 6
    for i in range(3, N + 1):
        DP[i] = DP[i - 1] + DP[i - 2]
    return DP[N] * 2 + (DP[N] + DP[N - 1]) * 2

print(solution(5))
print(solution(6))