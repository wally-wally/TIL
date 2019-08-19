import sys
sys.stdin = open('input.txt', 'r')

for _ in range(10):
    T = int(input())
    ladder = [list(map(int, input().split())) for __ in range(100)]
    col_num = go_left = go_right = result = 0
    for start in range(100): # 첫 줄에서 시작 위치 찾기
        row_num = -1
        if ladder[0][start]:
            result = col_num = start # result : 숫자 2 발견시 출력할 열 인덱스 번호
            while True:
                # 위에서 아래로 내려오는 과정
                while True:
                    row_num += 1
                    if row_num == 99: break
                    if col_num == 0: # X = 0에서 시작
                        if ladder[row_num][col_num + 1]:
                            go_right = 1
                            break
                    elif col_num == 99: # X = 99에서 시작
                        if ladder[row_num][col_num - 1]:
                            go_left = -1
                            break
                    elif col_num in range(1, 99): # 이외의 장소에서 X가 시작
                        if ladder[row_num][col_num + 1]:
                            go_right = 1
                            break
                        elif ladder[row_num][col_num - 1]:
                            go_left = -1
                            break

                if row_num == 99: break

                # 왼쪽 또는 오른쪽으로 움직이는 과정
                if go_right or go_left: # 오른쪽 또는 왼쪽으로 움직일 때
                    while True:
                        col_num += (go_right + go_left)
                        if ladder[row_num+ 1][col_num] and ladder[row_num - 1][col_num]:
                            go_right, go_left = 0, 0
                            break
                # elif go_left: # 왼쪽으로 움직일 때
                #     while True:
                #         col_num -= 1
                #         if ladder[row_num + 1][col_num] and ladder[row_num - 1][col_num]:
                #             go_left = 0
                #             break

            if ladder[row_num][col_num] == 2:
                break
    print('#{} {}'.format(T, result))

'''
for _ in range(10):
    T = int(input())
    # ladder = [list(map(int, input().split())) for __ in range(100)]
    ladder = []
    for __ in range(100):
        ladder.append(list(map(int, input().split())))
    # print(ladder)
    col_num = go_left = go_right = result = 0
    for start in range(100): # 첫 줄에서 시작 위치 찾기
        # print(ladder[0])
        # print('---------------')
        row_num = -1
        if ladder[0][start]:
            result = start
            col_num = start
            # print(row_num, col_num)
            while True:
                # 위에서 아래로 내려오는 과정
                if col_num == 0: # X = 0에서 시작
                    while True:
                        row_num += 1
                        if row_num == 99: break
                        if ladder[row_num][col_num+1] == 1:
                            # print(row_num, col_num)
                            go_right = 1
                            break
                elif col_num == 99: # X = 99에서 시작
                    while True:
                        row_num += 1
                        if row_num == 99: break
                        if ladder[row_num][col_num-1] == 1:
                            # print(row_num, col_num)
                            go_left = 1
                            break
                elif col_num in range(1, 99): # 이외의 장소에서 X가 시작
                    while True:
                        row_num += 1
                        if row_num == 99: break
                        if ladder[row_num][col_num+1] == 1:
                            # print(row_num, col_num)
                            go_right = 1
                            break
                        elif ladder[row_num][col_num-1] == 1:
                            # print(row_num, col_num)
                            go_left = 1
                            break
                        elif not ladder[row_num][col_num+1] and not ladder[row_num][col_num-1]:
                            pass

                if row_num == 99: break

                # 왼쪽 또는 오른쪽으로 움직이는 과정
                if go_right == 1:
                    while True:
                        col_num += 1
                        if ladder[row_num+1][col_num] == 1 and ladder[row_num-1][col_num] == 1:
                            # print(row_num, col_num)
                            go_right = 0
                            break
                elif go_left == 1:
                    while True:
                        col_num -= 1
                        if ladder[row_num + 1][col_num] == 1 and ladder[row_num - 1][col_num] == 1:
                            # print(row_num, col_num)
                            go_left = 0
                            break
                
                if row_num == 99: break

            if ladder[row_num][col_num] == 2:
                # print(row_num, col_num)
                break
            else:
                pass
                # col_num += 1
        elif ladder[0][start] == 0:
            pass
            # col_num += 1
        # print(col_num)
        # print(start)
    print('#{} {}'.format(T, result))
'''