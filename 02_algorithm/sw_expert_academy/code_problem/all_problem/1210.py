import sys
sys.stdin = open('input.txt', 'r')

# 내가 푼 방법(1) - DFS 활용
def DFS(r, c):
    arr[r][c] = 0
    if r == 0:
        return c
    if c - 1 >= 0 and arr[r][c - 1]:
        return DFS(r, c - 1)
    elif c + 1 < 100 and arr[r][c + 1]:
        return DFS(r, c + 1)
    else:
        return DFS(r - 1, c)

for t in range(10):
    tc = int(input())
    arr = [list(map(int, input().split())) for _ in range(100)]
    for start in range(100):
        if arr[99][start] == 2:
            print('#{} {}'.format(tc, DFS(99, start)))
            break

# 내가 푼 방법(2)
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


# 강사님이 푸신 방법
'''
for tc in range(1, 11):
    N = input()
    arr = [list(map(int, input().split())) for _ in range(100)]

    x, y = 99, 0
    for i in range(100):
        if arr[99][i] == 2:
            y = i
            break

    # 첫 번째 방법
    dir = 0   # 0: 위, 1:왼쪽, 2: 오른쪽
    while x: # x == 0 이 되면 종료
        if dir != 2 and y - 1 >= 0 and arr[x][y - 1]: #인덱스 유요한 범위인지 체크
            y, dir = y - 1, 1
        elif dir != 1 and y + 1 < 100 and arr[x][y + 1]:
            y, dir = y + 1, 2
        else:
            x, dir = x - 1, 0
    print(y)
            
    # 두 번째 방법
    while x:
        if y - 1 >= 0 and arr[x][y - 1]:
            while y - 1 >= 0 and arr[x][y - 1]:
                y -= 1
            x -= 1
        elif y + 1 < 100 and arr[x][y - 1]:
            while y + 1 < 100 and arr[x][y - 1]:
                y += 1
            x -= 1
        else:
            x -= 1
    print(y)

# 네 번째 방법(전역변수 활용)
ans = -1
def DES(x, y):
    global ans
    if x == 0:
        ans = y
        return

    arr[x][y] = 0
    if y - 1 >= 0 and arr[x][y - 1]:
        DFS(x, y - 1)
    elif y + 1 < 100 and arr[x][y + 1]:
        DFS(x, y + 1)
    else:
        DFS(x - 1, y)

for tc in range(1, 11):
    N = input()
    arr = [list(map(int, input().split())) for _ in range(100)]

    x, y = 99, 0
    for i in range(100):
        if arr[99][i] == 2:
            y = i
            break

    print(DFS(x, y))
'''