import sys
sys.stdin = open('input.txt', 'r')

T = int(input())

for a in range(T):
    N = int(input())
    visited = [[0] * N for _ in range(N)]
    # print(visited)
    chemical = [list(map(int, input().split())) for __ in range(N)]
    # print(chemical)

    position_list = []

    for i in range(N):
        for j in range(N):
            x_line, y_line = i, j
            width, height = 0, 0

            if visited[i][j] == 0 and chemical[i][j] != 0:

                # 행의 가로길이 계산
                while True:
                    y_line += 1
                    if y_line < N:
                        if chemical[x_line][y_line] == 0:
                            break
                    else:
                        break
                width = y_line - j

                # 행의 세로길이 계산
                y_line -= 1
                while True:
                    x_line += 1
                    if x_line < N:
                        if chemical[x_line][y_line] == 0:
                            break
                    else:
                        break
                height = x_line - i

                for x in range(i, x_line):
                    for y in range(j, y_line + 1):
                        visited[x][y] = 1

                position_list.append((height, width))
    result = str(len(position_list)) + ' '

    counting_list = []
    position = 0
    for element in position_list:
        value = 1
        mini_element = []
        for num in element:
            value *= num
            mini_element.append(num)
        mini_element.insert(0, value)
        mini_element.append(position)
        counting_list.append(mini_element)
        position += 1
    # print(position_list)
    # print(counting_list)
    # print(sorted(counting_list))

    for element in sorted(counting_list):
        for elem in position_list[element[3]]:
            result += str(elem) + ' '
    print('#{} {}'.format(a + 1, result))