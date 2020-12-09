import sys
sys.stdin = open('input_20112.txt', 'r')

def make_word(letters):
    return ''.join(letters)


N = int(input())
board = [[letter for letter in input()] for _ in range(N)]
rotate_board = list(zip(*board))

idx = 0
answer = 'YES'
while idx < N:
    row_word, col_word = make_word(board[idx]), make_word(rotate_board[idx])
    if row_word != col_word:
        answer = 'NO'
        break
    idx += 1

print(answer)