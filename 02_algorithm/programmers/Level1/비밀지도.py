def solution(n, arr1, arr2):
    secret_map = [[0] * n for _ in range(n)]
    arr_1, arr_2 = [], []
    # 10진법 -> 2진법
    for idx in range(n):
        num1, num2 = bin(arr1[idx])[2:], bin(arr2[idx])[2:]
        bin_num1, bin_num2 = '0' * (n - len(num1)) + num1, '0' * (n - len(num2)) + num2
        arr_1.append(bin_num1)
        arr_2.append(bin_num2)
    # 겹치는 부분 판별
    for cell_idx in range(n * n):
        row, col = cell_idx // n, cell_idx % n
        secret_map[row][col] = ' ' if arr_1[row][col] == arr_2[row][col] == '0' else '#'
    # 출력 형식에 맞게 조절
    answer = []
    for i in range(n):
        line = ''
        for j in range(n):
            line += secret_map[i][j]
        answer.append(line)
    return answer
        
print(solution(5, [9, 20, 28, 18, 11], [30, 1, 21, 17, 28]))