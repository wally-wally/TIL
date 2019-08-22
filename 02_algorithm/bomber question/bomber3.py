import sys
sys.stdin = open('bomber3_input.txt', 'r')

T = int(input())

for a in range(T):
    M, N = map(int, input().split())
    arr = [list(map(int, input().split())) for _ in range(M)]
    max_value = 0
    result_row = result_col = 0
    for i in range(M - N + 1): # 시작위치(행)
        for j in range(M - N + 1): # 시작위치(열)
            # print(i, j)
            bomb_sum = 0
            for k in range(i, i + N):
                for m in range(j, j + N):
                    # print('row:{} col:{} / {}'.format(k, m, arr[k][m]))
                    bomb_sum += arr[k][m]
            # print('bomb_sum:{}'.format(bomb_sum))
            # print('-----')
            if bomb_sum >= max_value:
                result_row, result_col = i, j
                max_value = bomb_sum
    print('#{} {} {} {}'.format(a + 1, result_row, result_col, max_value))