def solution(land):
    DP = [land[0]] + [[0] * 4 for _ in range(len(land) - 1)]
    for row in range(1, len(land)):
        for col in range(4):
            if col == 0:
                DP[row][col] = max(DP[row - 1][1], DP[row - 1][2], DP[row - 1][3]) + land[row][col]
            elif col == 1:
                DP[row][col] = max(DP[row - 1][0], DP[row - 1][2], DP[row - 1][3]) + land[row][col]
            elif col == 2:
                DP[row][col] = max(DP[row - 1][0], DP[row - 1][1], DP[row - 1][3]) + land[row][col]
            else:
                DP[row][col] = max(DP[row - 1][0], DP[row - 1][1], DP[row - 1][2]) + land[row][col]
    return max(DP[row])

print(solution([[1,2,3,5],[5,6,7,8],[4,3,2,1]]))