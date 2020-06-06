import sys
sys.stdin = open('input_1249.txt', 'r')

dx, dy = (-1, 0, 1, 0), (0, 1, 0, -1)
for tc in range(int(input())):
    N = int(input())
    map_info = [[int(cell) for cell in input()] for _ in range(N)]
    checked = [[0xffffff] * N for _ in range(N)]
    checked[0][0] = 0
    queue = [(0, 0)]
    while queue:
        pop_elem = queue.pop(0)
        for i in range(4):
            new_row, new_col = pop_elem[0] + dx[i], pop_elem[1] + dy[i]
            if new_row < 0 or new_row >= N or new_col < 0 or new_col >= N: continue
            if checked[pop_elem[0]][pop_elem[1]] + map_info[new_row][new_col] < checked[new_row][new_col]:
                queue.append((new_row, new_col))
                checked[new_row][new_col] = checked[pop_elem[0]][pop_elem[1]] + map_info[new_row][new_col]
    print('#{} {}'.format(tc + 1, checked[N - 1][N - 1]))