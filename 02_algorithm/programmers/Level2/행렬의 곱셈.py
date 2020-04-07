def solution(arr1, arr2):
    row_cnt, col_cnt, mul_cnt = len(arr1), len(arr2[0]), len(arr2)
    answer = [[0 for _ in range(col_cnt)] for _ in range(row_cnt)]
    for i in range(row_cnt * col_cnt):
        row, col = divmod(i, col_cnt)
        value = 0
        for j in range(mul_cnt):
            value += arr1[row][j] * arr2[j][col]
        answer[row][col] = value
    return answer


print(solution([[1, 4], [3, 2], [4, 1]], [[3, 3], [3, 3]]))
print(solution([[2, 3, 2], [4, 2, 4], [3, 1, 4]], [[5, 4, 3], [2, 4, 1], [3, 1, 1]]))