def solution(m, n, board):
    dx, dy = (0, 0, 1, 1), (0, 1, 1, 0)
    answer = 0
    game_board = [[letter for letter in line] for line in board]
    while True:
        # (1) 2X2 형태로 없어지는 블록의 위치 찾기
        eliminate_idx = []
        for row in range(m - 1):
            for col in range(n - 1):
                if game_board[row][col] != '*':
                    now_block = game_board[row][col]
                    for i in range(1, 4):
                        new_row, new_col = row + dx[i], col + dy[i]
                        if now_block != game_board[new_row][new_col]: break
                    else:
                        eliminate_idx.append((row, col))
        if not len(eliminate_idx):
            return answer
        # (2) 블록 제거
        for idx in eliminate_idx:
            r, c = idx
            for i in range(4):
                new_r, new_c = r + dx[i], c + dy[i]
                if game_board[new_r][new_c] != '*':
                    game_board[new_r][new_c] = '*'
                    answer += 1
        # (3) 블록 떨어뜨린 후 새로운 게임판에 넣기
        new_game_board = [['*'] * n for _ in range(m)]
        col_idx = 0
        for vertical_line in zip(*game_board):
            vertical_line, pop_idx, idx = list(vertical_line), [], 0
            for block in vertical_line:
                if block == '*':
                    pop_idx.append(idx)
                idx += 1
            for p_idx in reversed(pop_idx):
                vertical_line.pop(p_idx)
            for _ in range(len(pop_idx)):
                vertical_line.insert(0, '*')
            for row_idx in range(m):
                new_game_board[row_idx][col_idx] = vertical_line[row_idx]
            col_idx += 1
        game_board = new_game_board


print(solution(4, 5, ['CCBDE', 'AAADE', 'AAABF', 'CCBBF']))
print(solution(6, 6, ['TTTANT', 'RRFACC', 'RRRFCC', 'TRRRAA', 'TTMMMF', 'TMMTTJ']))