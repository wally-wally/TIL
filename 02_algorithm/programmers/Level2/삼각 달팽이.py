def solution(n):
    answer = []
    temp_array = [[0 for _ in range(n)] for _ in range(n)]
    add_count, value, rule_idx = n, 1, 0
    row, col = 0, 0
    while add_count:
        if (rule_idx == 0):
            # row += 1
            for i in range(add_count):
                temp_array[row + i][col] = value
                value += 1
            row, col = row + add_count - 1, col + 1
            rule_idx = 1
        elif (rule_idx == 1):
            # col += 1
            for i in range(add_count):
                temp_array[row][col + i] = value
                value += 1
            row, col = row - 1, col + add_count - 2
            rule_idx = 2
        else:
            # row, col 둘다 -1
            for i in range(add_count):
                temp_array[row - i][col - i] = value
                value += 1
            row, col = row - add_count + 2, col - add_count + 1
            rule_idx = 0
        add_count -= 1

    for idx in range(n):
        answer += temp_array[idx][:idx + 1]

    return answer

print(solution(4))
print(solution(5))
print(solution(6))