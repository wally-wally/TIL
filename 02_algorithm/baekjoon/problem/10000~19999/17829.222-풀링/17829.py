import sys
sys.stdin = open('input_17829.txt', 'r')

def find_second_large_number(i, j, board):
    return sorted([board[i][j], board[i][j + 1], board[i + 1][j], board[i + 1][j + 1]])[2]

N = int(input())
board = [list(map(int, input().split())) for _ in range(N)]

while N > 1:
    new_board = []
    for i in range(0, N, 2):
        new_board_line = [find_second_large_number(i, j, board) for j in range(0, N, 2)]
        new_board.append(new_board_line)
    board = new_board
    N //= 2
print(board[0][0])