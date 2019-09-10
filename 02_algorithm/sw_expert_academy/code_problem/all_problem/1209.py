import sys
sys.stdin = open('input.txt', 'r')

# 내가 푼 방법
for a in range(10):
    T = int(input())
    arr = []
    for i in range(100):
        arr.append(list(map(int, input().split())))

    Max_value = 0

    # 행 합, 각 대각선의 합 계산
    for j in range(100):
        row_Sum = col_Sum = 0
        diag_Sum_1 = 0  # 왼쪽 위에서 오른쪽 아래로 대각선
        diag_Sum_2 = 0  # 오른쪽 위에서 왼쪽 아래로 대각선
        row_Sum = sum(arr[j])
        diag_Sum_1 += arr[j][j]
        diag_Sum_2 += arr[j][99-j]
        if row_Sum >= Max_value:
            Max_value = row_Sum
        for k in range(100):
            col_Sum += arr[k][j]
        if col_Sum >= Max_value:
            Max_value = col_Sum

    if diag_Sum_1 >= Max_value:
        Max_vale = diag_Sum_1
    if diag_Sum_2 >= Max_value:
        Max_vale = diag_Sum_2

    print('#{} {}'.format(T, Max_value))


# 강사가 푼 방법
for tc in range(1, 11):
    N = input()
    arr = [list(map(int, input().split())) for _ in range(100)]

    ans = 0 # 최댓값 저장
    dsum1 = dsum2 = 0
    for i in range(100):
        rsum = csum = 0
        dsum1 += arr[i][i]
        dsum2 += arr[i][99-i]
        for j in range(100):
            rsum += arr[i][j]
            csum += arr[j][i]
        ans = max(ans, rsum, csum, dsum1, dsum2)

    print('#{} {}'.format(tc, ans))