import sys
sys.stdin = open('input_1873.txt', 'r')

for a in range(int(input())):
    H, W = map(int, input().split())
    arr = []
    tank_position = [] # row 좌표, col 좌표, 바라보는 방향(상-우-하-좌 : 0-1-2-3)
    for i in range(H):
        line = input()
        element = []
        for j in range(W):
            element.append(line[j])
            if line[j] == '^':
                tank_position = [i, j, 0]
            elif line[j] == '>':
                tank_position = [i, j, 1]
            elif line[j] == 'v':
                tank_position = [i, j, 2]
            elif line[j] == '<':
                tank_position = [i, j, 3]
        arr.append(element)

    N = int(input())
    all_commend = input()
    for b in range(N):
        crush_status = 0
        if all_commend[b] == 'U':
            arr[tank_position[0]][tank_position[1]] = '^'
            tank_position[2] = 0
            new_Row = tank_position[0] - 1
            new_Col = tank_position[1]
            if new_Row >= 0 and arr[new_Row][new_Col] == '.':
                arr[tank_position[0]][tank_position[1]] = '.'
                arr[new_Row][new_Col] = '^'
                crush_status = 1
        elif all_commend[b] == 'R':
            arr[tank_position[0]][tank_position[1]] = '>'
            tank_position[2] = 1
            new_Row = tank_position[0]
            new_Col = tank_position[1] + 1
            if new_Col < W and arr[new_Row][new_Col] == '.':
                arr[tank_position[0]][tank_position[1]] = '.'
                arr[new_Row][new_Col] = '>'
                crush_status = 1
        elif all_commend[b] == 'D':
            arr[tank_position[0]][tank_position[1]] = 'v'
            tank_position[2] = 2
            new_Row = tank_position[0] + 1
            new_Col = tank_position[1]
            if new_Row < H and arr[new_Row][new_Col] == '.':
                arr[tank_position[0]][tank_position[1]] = '.'
                arr[new_Row][new_Col] = 'v'
                crush_status = 1
        elif all_commend[b] == 'L':
            arr[tank_position[0]][tank_position[1]] = '<'
            tank_position[2] = 3
            new_Row = tank_position[0]
            new_Col = tank_position[1] - 1
            if new_Col >= 0 and arr[new_Row][new_Col] == '.':
                arr[tank_position[0]][tank_position[1]] = '.'
                arr[new_Row][new_Col] = '<'
                crush_status = 1
        elif all_commend[b] == 'S':
            if tank_position[2] == 0:
                for m in range(tank_position[0], -1, -1):
                    if arr[m][tank_position[1]] == '*':
                        arr[m][tank_position[1]] = '.'
                        break
                    elif arr[m][tank_position[1]] == '#':
                        break
                    elif arr[m][tank_position[1]] == '-':
                        pass
            elif tank_position[2] == 1:
                for n in range(tank_position[1], W):
                    if arr[tank_position[0]][n] == '*':
                        arr[tank_position[0]][n] = '.'
                        break
                    elif arr[tank_position[0]][n] == '#':
                        break
                    elif arr[tank_position[0]][n] == '-':
                        pass
            elif tank_position[2] == 2:
                for p in range(tank_position[0], H):
                    if arr[p][tank_position[1]] == '*':
                        arr[p][tank_position[1]] = '.'
                        break
                    elif arr[p][tank_position[1]] == '#':
                        break
                    elif arr[p][tank_position[1]] == '-':
                        pass
            elif tank_position[2] == 3:
                for q in range(tank_position[1], -1, -1):
                    if arr[tank_position[0]][q] == '*':
                        arr[tank_position[0]][q] = '.'
                        break
                    elif arr[tank_position[0]][q] == '#':
                        break
                    elif arr[tank_position[0]][q] == '-':
                        pass
        if crush_status:
            tank_position[0] = new_Row
            tank_position[1] = new_Col

        # 배틀필드 확인용 코드
        # print('-----{}회-----'.format(b + 1))
        # for x in range(H):
        #     for y in range(W):
        #         print('{:>2}'.format(arr[x][y]), end='')
        #     print()
    print('#{}'.format(a + 1), end=' ')
    for x in range(H):
        for y in range(W):
            print(arr[x][y], end='')
        print()