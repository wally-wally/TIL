import sys
sys.stdin = open('input.txt', 'r')

T = int(input())

for a in range(T):
    N, M = map(int, input().split())
    if N == 4:
        board = [[0, 0, 0, 0], [0, 2, 1, 0], [0, 1, 2, 0], [0, 0, 0, 0]]
    elif N == 6:
        board = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 2, 1, 0, 0], [0, 0, 1, 2, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]]
    elif N == 8:
        board = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 2, 1, 0, 0, 0], [0, 0, 0, 1, 2, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]]
    black, white = 0, 0
    dx = [-1, -1, 0, +1, +1, +1, 0, -1]
    dy = [0, +1, +1, +1, 0, -1, -1, -1]
    for u in range(M):
        ori_row, ori_col, stone = map(int, input().split())
        row, col = ori_row - 1, ori_col - 1
        board[row][col] = stone
        all_check = 0
        for i in range(8):
            j = 1
            check = 0
            change_list = []
            while True:
                nRow = row + dx[i] * j
                nCol = col + dy[i] * j
                if 0 <= nRow <= N - 1 and 0 <= nCol <= N - 1:
                    if not check and board[nRow][nCol] == stone:
                        break
                    if check:
                        if board[nRow][nCol] == stone:
                            for element in change_list:
                                board[element[0]][element[1]] = stone
                            all_check = 1
                            break
                    if board[nRow][nCol] == (stone % 2) + 1:
                        check = 1
                        change_list.append([nRow, nCol])
                    elif not board[nRow][nCol]:
                        change_list = []
                        check = 0
                        break
                else:
                    break
                j += 1
        if all_check == 0:
            board[row][col] = 0

        # 오셀로 게임판 확인용
        # print('-----{}회-----'.format(u + 1))
        # for x in range(N):
        #     for y in range(N):
        #         print('{:>2}'.format(board[x][y]), end = '')
        #     print()
    for m in range(N):
        for n in range(N):
            if board[m][n] == 1:
                black += 1
            elif board[m][n] == 2:
                white += 1
    print('#{} {} {}'.format(a + 1, black, white))