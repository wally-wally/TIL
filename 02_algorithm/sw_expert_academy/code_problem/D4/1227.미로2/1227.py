import sys
sys.stdin = open('input_1227.txt', 'r')

def check_miro():
    queue = [(start_idx[0], start_idx[1])]
    while queue:
        pop_cell = queue.pop(0)
        miro[pop_cell[0]][pop_cell[1]] = 1
        for i in range(4):
            new_row, new_col = pop_cell[0] + dx[i], pop_cell[1] + dy[i]
            if new_row < 0 or new_row >= 100 or new_col < 0 or new_col >= 100: continue
            if miro[new_row][new_col] == 3:
                return 1
            if miro[new_row][new_col] == 0:
                queue.append((new_row, new_col))
    return 0

dx, dy = (-1, 0, 1, 0), (0, 1, 0, -1)
for _ in range(10):
    tc = int(input())
    start_idx, end_idx = [], []
    miro = []
    for r in range(100):
        input_line = input()
        line = []
        for c in range(100):
            if input_line[c] == '2':
                start_idx = [r, c]
            elif input_line[c] == '3':
                end_idx = [r, c]
            line.append(int(input_line[c]))
        miro.append(line)
    print('#{} {}'.format(tc, check_miro()))