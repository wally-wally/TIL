import sys
sys.stdin = open('bomber1_input.txt', 'r')

T = int(input())

for a in range(T):
    line = int(input())
    arr = [list(map(int, input().split())) for _ in range(line)]
    max_value = 0
    result_row = result_col = 0
    for i in range(line):
        row_sum = sum(arr[i])
        for j in range(line):
            bomb_sum = 0
            for k in range(line):
                bomb_sum += arr[k][j]
            bomb_sum += (row_sum - arr[i][j])
            if bomb_sum >= max_value:
                result_row = i
                result_col = j
                max_value = bomb_sum
    print('#{} {} {} {}'.format(a + 1, result_row, result_col, max_value))

             