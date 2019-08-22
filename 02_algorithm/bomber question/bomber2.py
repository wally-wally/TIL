import sys
sys.stdin = open('bomber2_input.txt', 'r')

T = int(input())

for a in range(T):
    line = int(input())
    arr = [list(map(int, input().split())) for _ in range(line)]
    max_value = 0
    result_row = result_col = 0
    for i in range(line): # 시작위치(행)
        for j in range(line): # 시작위치(열)
            bomb_sum = 0
            init_i, init_j = i, j
            bomb_sum += arr[i][j]
            # 좌측 상단 방향
            while True:
                init_i -= 1
                init_j -= 1
                if init_i < 0 or init_j < 0:
                    break
                elif init_i >= 0 and init_j >= 0:
                    bomb_sum += arr[init_i][init_j]
            # print('#{} {}'.format(1, bomb_sum))
            init_i, init_j = i, j
            # 우측 상단 방향
            while True:
                init_i -= 1
                init_j += 1
                if init_i < 0 or init_j > line - 1:
                    break
                elif init_i >= 0 and init_j >= 0:
                    bomb_sum += arr[init_i][init_j]
            # print('#{} {}'.format(2, bomb_sum))
            init_i, init_j = i, j
            # 좌측 하단 방향
            while True:
                init_i += 1
                init_j -= 1
                if init_i > line - 1 or init_j < 0:
                    break
                elif init_i >= 0 and init_j >= 0:
                    bomb_sum += arr[init_i][init_j]
            # print('#{} {}'.format(3, bomb_sum))
            init_i, init_j = i, j
            # 우측 하단 방향
            while True:
                init_i += 1
                init_j += 1
                if init_i > line - 1 or init_j > line - 1:
                    break
                elif init_i >= 0 and init_j >= 0:
                    bomb_sum += arr[init_i][init_j]
            # print('#{} {}'.format(4, bomb_sum))
            if bomb_sum >= max_value:
                result_row, result_col = i, j
                max_value = bomb_sum
            # print('----------------------------')
    print('#{} {} {} {}'.format(a + 1, result_row, result_col, max_value))