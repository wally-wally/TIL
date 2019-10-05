import sys
sys.stdin = open('input_2580.txt', 'r')

sys.setrecursionlimit(10**7)

def check_numbers(position):
    visited = [False] + [True for _ in range(9)]
    #1. 가로 판별
    row_line = arr[position[0]]
    for number_x in row_line:
        if number_x: visited[number_x] = False
    
    # 2. 세로 판별
    col_line = [arr[c][position[1]] for c in range(9)]
    for number_y in col_line:
        if number_y: visited[number_y] = False

    # 3. 3X3 배열 판별
    check_row, check_col = (position[0] // 3) * 3, (position[1] // 3) * 3
    for chk_r in range(check_row, check_row + 3):
        for chk_c in range(check_col, check_col + 3):
            if arr[chk_r][chk_c]:
                visited[arr[chk_r][chk_c]] = False

    return_value = []
    for num in range(1, 10):
        if visited[num]:
            return_value.append(num)
    return return_value

def sudoku(n):
    global complete_var
    if len(zero_position) == n:
        for idx in range(81):
            row, col = idx // 9, idx % 9
            print(arr[row][col], end=' ')
            if col == 8:
                print()
        complete_var = 1
    else:
        for num in check_numbers(zero_position[n]):
            arr[zero_position[n][0]][zero_position[n][1]] = num
            sudoku(n + 1)
            if complete_var: return
            arr[zero_position[n][0]][zero_position[n][1]] = 0


arr = [list(map(int, input().split())) for _ in range(9)]
zero_position, complete_var = [], 0
for a in range(81):
    row, col = a // 9, a % 9
    if not arr[row][col]:
        zero_position.append([row, col])
sudoku(0)