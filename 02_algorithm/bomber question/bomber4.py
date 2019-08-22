import sys
sys.stdin = open('bomber4_input.txt', 'r')

T = int(input())

for a in range(T):
    N, M = map(int, input().split())
    arr = [list(map(int, input().split())) for _ in range(N)]
    bomb_sum = 0
    for _ in range(M):
        start_row, start_col, expo = map(int, input().split())
        for i in range(start_row, start_row + expo):
            for j in range(start_col, start_col + expo):
                try:
                    bomb_sum += arr[i][j]
                    arr[i][j] = 0
                except IndexError:
                    pass
    print('#{} {}'.format(a + 1, bomb_sum))