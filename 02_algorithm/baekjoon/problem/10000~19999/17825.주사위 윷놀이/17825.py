import sys
sys.stdin = open('input_17825.txt', 'r')

def change_route(r, c):
    if r == 0:
        if c >= 21:
            return (0, 21)
        if game_board[r][c] == 10:
            return (1, 0)
        elif game_board[r][c] == 20:
            return (2, 0)
        elif game_board[r][c] == 30:
            return (3, 0)
        elif game_board[r][c] == 40:
            return (4, 3)
    elif r == 1 or r == 3:
        if c >= 4:
            return (4, c - 4)
    elif r == 2:
        if c >= 3:
            return (4, c - 3)
    elif r == 4:
        if c >= 4:
            return (4, 4)
    return (r, c)


def DFS(dice_idx, temp_score, answer):
    if dice_idx == 10:
        return max(answer, temp_score)
    for i in range(4):
        original_piece_position = piece_positions[i]
        r, c = piece_positions[i]
        c += dice_numbers[dice_idx]
        r, c = change_route(r, c)
        if (r == 4 and c == 4) or (r == 0 and c == 21):
            piece_positions[i] = [r, c]
        else:
            if [r, c] in piece_positions:
                continue
            piece_positions[i] = [r, c]
            temp_score += game_board[r][c]
        answer = DFS(dice_idx + 1, temp_score, answer)
        temp_score -= game_board[r][c]
        piece_positions[i] = original_piece_position
    return answer


game_board = [
    [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 0],
    [10, 13, 16, 19, 25],
    [20, 22, 24, 25],
    [30, 28, 27, 26, 25],
    [25, 30, 35, 40, 0]
]

dice_numbers = list(map(int, input().split()))
piece_positions = [[0, 0], [0, 0], [0, 0], [0, 0]]

print(DFS(0, 0, 0))