import sys
sys.stdin = open('input_5188.txt', 'r')

def min_sum(position, val):
    global ans, N
    if val >= ans:
        return
    if position == [N - 1, N - 1]:
        if val <= ans:
            ans = val
            return
    move = [(0, 1), (1, 0)] # 우, 하
    for i in range(2):
        n_row = position[0] + move[i][0]
        n_col = position[1] + move[i][1]
        if 0 <= n_row < N and 0 <= n_col < N: 
            if not used[n_row][n_col]:
                used[n_row][n_col] = True
                min_sum([n_row, n_col], val + arr[n_row][n_col])
                used[n_row][n_col] = False

for test_case in range(int(input())):
    N = int(input())
    arr = [list(map(int, input().split())) for _ in range(N)]
    ans = 13 * 12 * 10
    used = [[False] * N for __ in range(N)]
    init_position = [0, 0]
    min_sum(init_position, arr[0][0])
    print('#{} {}'.format(test_case + 1, ans))