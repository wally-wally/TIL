def solution(n):
    DP = [1, 2]
    i = 0
    while len(DP) < n:
        DP.append(DP[i] + DP[i + 1])
        i += 1
    return DP[n - 1] % 1234567

print(solution(4))