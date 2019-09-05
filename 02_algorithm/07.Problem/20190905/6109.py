import sys
sys.stdin = open('input_6109.txt', 'r')

# 비슷한 경우들을 묶어서 코드를 간략화 한 경우(추후 버전)
for a in range(int(input())):
    N, direction = map(str, input().split())
    board = [list(map(int, input().split())) for _ in range(int(N))]
    result = [[0] * int(N) for __ in range(int(N))]
    info = [0, int(N), 1] if direction == 'up' or direction == 'left' else [int(N) - 1, -1, -1]

    if direction == 'up' or direction == 'down':
        for col in range(int(N)):
            numbers = [-1]
            memory = [0, 0, 0]
            for row in range(info[0], info[1], info[2]):
                if board[row][col] != 0:
                    if memory[0] != board[row][col]:
                        memory = [board[row][col], row, col]
                        numbers.append(board[memory[1]][memory[2]])
                    elif memory[0] == board[row][col]:
                        board[memory[1]][memory[2]] += board[row][col]
                        if len(numbers) >= 2:
                            numbers.pop()
                        numbers.append(board[memory[1]][memory[2]])
                        board[row][col] = 0
                        memory = [0, 0, 0]
            idx = 1
            for i in range(info[0], info[1], info[2]):
                try:
                    result[i][col] = numbers[idx]
                    idx += 1
                except IndexError:
                    pass
    
    elif direction == 'left' or direction == 'right':
        for row in range(int(N)):
            numbers = [-1]
            memory = [0, 0, 0]
            for col in range(info[0], info[1], info[2]):
                if board[row][col] != 0:
                    if memory[0] != board[row][col]:
                        memory = [board[row][col], row, col]
                        numbers.append(board[memory[1]][memory[2]])
                    elif memory[0] == board[row][col]:
                        board[memory[1]][memory[2]] += board[row][col]
                        if len(numbers) >= 2:
                            numbers.pop()
                        numbers.append(board[memory[1]][memory[2]])
                        board[row][col] = 0
                        memory = [0, 0, 0]
            idx = 1
            for j in range(info[0], info[1], info[2]):
                try:
                    result[row][j] = numbers[idx]
                    idx += 1
                except IndexError:
                    pass

    print('#{}'.format(a + 1))
    for m in range(int(N)):
        for n in range(int(N)):
            print(result[m][n], end = ' ')
        print()


    # 게임판 확인용 코드(참고용)
    # print('------------')
    # for m in range(int(N)):
    #     for n in range(int(N)):
    #         print('{:>4}'.format(result[m][n]), end='')
    #     print()
    # print('------------')
    # print()

# 상하좌우 방향을 전부 다 나눠서 작성한 경우(초기 버전)
# for a in range(int(input())):
#     N, direction = map(str, input().split())
#     board = [list(map(int, input().split())) for _ in range(int(N))]
#     result = [[0] * int(N) for __ in range(int(N))]
#     if direction == 'up':
#         for col in range(int(N)):
#             numbers = [-1]
#             memory = [0, 0, 0]
#             for row in range(int(N)):
#                 if board[row][col] != 0:
#                     if memory[0] != board[row][col]:
#                         memory = [board[row][col], row, col]
#                         numbers.append(board[memory[1]][memory[2]])
#                     elif memory[0] == board[row][col]:
#                         board[memory[1]][memory[2]] += board[row][col]
#                         if len(numbers) >= 2:
#                             numbers.pop()
#                         numbers.append(board[memory[1]][memory[2]])
#                         board[row][col] = 0
#                         memory = [0, 0, 0]
#             for up in range(int(N)):
#                 try:
#                     result[up][col] = numbers[up + 1]
#                 except IndexError:
#                     pass
#     elif direction == 'down':
#         for col in range(int(N)):
#             numbers = [-1]
#             memory = [0, 0, 0]
#             for row in range(int(N)-1, -1, -1):
#                 if board[row][col] != 0:
#                     if memory[0] != board[row][col]:
#                         memory = [board[row][col], row, col]
#                         numbers.append(board[memory[1]][memory[2]])
#                     elif memory[0] == board[row][col]:
#                         board[memory[1]][memory[2]] += board[row][col]
#                         if len(numbers) >= 2:
#                             numbers.pop()
#                         numbers.append(board[memory[1]][memory[2]])
#                         board[row][col] = 0
#                         memory = [0, 0, 0]
#             idx = 1
#             for down in range(int(N)-1, -1, -1):
#                 try:
#                     result[down][col] = numbers[idx]
#                     idx += 1
#                 except IndexError:
#                     pass
#     elif direction == 'left':
#         for row in range(int(N)):
#             numbers = [-1]
#             memory = [0, 0, 0]
#             for col in range(int(N)):
#                 if board[row][col] != 0:
#                     if memory[0] != board[row][col]:
#                         memory = [board[row][col], row, col]
#                         numbers.append(board[memory[1]][memory[2]])
#                     elif memory[0] == board[row][col]:
#                         board[memory[1]][memory[2]] += board[row][col]
#                         if len(numbers) >= 2:
#                             numbers.pop()
#                         numbers.append(board[memory[1]][memory[2]])
#                         board[row][col] = 0
#                         memory = [0, 0, 0]
#             for left in range(int(N)):
#                 try:
#                     result[row][left] = numbers[left + 1]
#                 except IndexError:
#                     pass
#     elif direction == 'right':
#         for row in range(int(N)):
#             numbers = [-1]
#             memory = [0, 0, 0]
#             for col in range(int(N)-1, -1, -1):
#                 if board[row][col] != 0:
#                     if memory[0] != board[row][col]:
#                         memory = [board[row][col], row, col]
#                         numbers.append(board[memory[1]][memory[2]])
#                     elif memory[0] == board[row][col]:
#                         board[memory[1]][memory[2]] += board[row][col]
#                         if len(numbers) >= 2:
#                             numbers.pop()
#                         numbers.append(board[memory[1]][memory[2]])
#                         board[row][col] = 0
#                         memory = [0, 0, 0]
#             idx = 1
#             for right in range(int(N)-1, -1, -1):
#                 try:
#                     result[row][right] = numbers[idx]
#                     idx += 1
#                 except IndexError:
#                     pass
#     print('#{}'.format(a + 1))
#     for m in range(int(N)):
#         for n in range(int(N)):
#             print(result[m][n], end = ' ')
#         print()