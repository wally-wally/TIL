import sys
sys.stdin = open('input_1961.txt', 'r')

# 3 => # 2 => # 1 순서로 코드를 간략화 시킴
 
# 1
for a in range(int(input())):
    N = int(input())
    arr = [list(map(str, input().split())) for _ in range(N)]

    print('#{}'.format(a + 1))
    for i in range(N):
        for case in range(1, 4):
            for j in range(N):
                if case == 1:
                    print(arr[N - j - 1][i], end='')
                elif case == 2:
                    print(arr[N - i - 1][N - j - 1], end='')
                else:
                    print(arr[j][N - i - 1], end='')
            print(' ', end='')
        print()

# 2
for a in range(int(input())):
    N = int(input())
    arr = [list(map(str, input().split())) for _ in range(N)]
    rotate_1, rotate_2, rotate_3 = [], [], []
    
    for i in range(N):
        element_1, element_2, element_3 = [], [], []
        for j in range(N):
            element_1.append(arr[N - j - 1][i])
            element_2.append(arr[N - i - 1][N - j - 1])
            element_3.append(arr[j][N - i - 1])
        rotate_1.append(element_1)
        rotate_2.append(element_2)
        rotate_3.append(element_3)

    print('#{}'.format(a + 1))
    for m in range(N):
        print(''.join(rotate_1[m]), end=' ')
        print(''.join(rotate_2[m]), end=' ')
        print(''.join(rotate_3[m]))

# 3
for a in range(int(input())):
    N = int(input())
    arr = [list(map(int, input().split())) for _ in range(N)]
    rotate_1, rotate_2, rotate_3 = [], [], []
     
    # 90도 회전
    for i in range(N):
        element = []
        for j in range(N - 1, -1, -1):
            element.append(str(arr[j][i]))
        rotate_1.append(element)
     
    # 180도 회전
    for i in range(N - 1, -1, -1):
        element = []
        for j in range(N - 1, -1, -1):
            element.append(str(arr[i][j]))
        rotate_2.append(element)
     
    # 270도 회전
    for i in range(N - 1, -1, -1):
        element = []
        for j in range(N):
            element.append(str(arr[j][i]))
        rotate_3.append(element)
     
    # 양식에 맞게 출력
    print('#{}'.format(a + 1))
    for m in range(N):
        print(''.join(rotate_1[m]), end=' ')
        print(''.join(rotate_2[m]), end=' ')
        print(''.join(rotate_3[m]))