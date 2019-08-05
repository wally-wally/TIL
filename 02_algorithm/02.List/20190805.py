import sys
sys.stdin = open('input.txt', 'r')

for a in range(10):
    T = int(input())
    arr = []
    for i in range(100):
        arr.append(list(map(int, input().split())))

    Max_value = 0

    # 행 합, 각 대각선의 합 계산
    for j in range(100):
        row_Sum = 0
        diag_Sum_1 = 0  # 왼쪽 위에서 오른쪽 아래로 대각선
        diag_Sum_2 = 0  # 오른쪽 위에서 왼쪽 아래로 대각선
        row_Sum = sum(arr[j])
        diag_Sum_1 += arr[j][j]
        diag_Sum_2 += arr[j][99-j]
        if row_Sum >= Max_value:
            Max_value = row_Sum

    if diag_Sum_1 >= Max_value:
        Max_vale = diag_Sum_1
    if diag_Sum_2 >= Max_value:
        Max_vale = diag_Sum_2

    # 각 열 합 계산
    for k in range(100):
        col_Sum = 0
        for m in range(100):
            col_Sum += arr[m][k]
        if col_Sum >= Max_value:
            Max_value = col_Sum

    print('#{} {}'.format(T, Max_value))