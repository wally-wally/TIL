def solution(data):
    n = len(data)
    arr = [[num for num in data[idx]] + [0] * (n - idx - 1) for idx in range(n)]
    DP = [[0] * n for _ in range(n)]
    DP[0][0] = arr[0][0]
    if n == 1:
        return DP[0][0]
    for i in range(1, n):
        for j in range(i + 1):
            if j == 0:
                DP[i][j] = DP[i - 1][j] + arr[i][j]
            elif j == i:
                DP[i][j] = DP[i - 1][j - 1] + arr[i][j]
            else:
                DP[i][j] = max(DP[i - 1][j - 1], DP[i - 1][j]) + arr[i][j]
    return max(DP[n - 1])

print(solution([[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]]))