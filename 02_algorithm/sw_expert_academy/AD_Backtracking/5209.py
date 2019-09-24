import sys
sys.stdin = open('input_5209.txt', 'r')

def min_production_cost(chk_cnt, val):
    global result
    if val > result:
        return
    if chk_cnt == N:
        if val <= result:
            result = val
            return
    for i in range(N):
        if not visited[i]:
            visited[i] = True
            min_production_cost(chk_cnt + 1, val + arr[chk_cnt][i])
            visited[i] = False

for test_case in range(int(input())):
    N = int(input())
    arr = [list(map(int, input().split())) for _ in range(N)]
    check_cnt, result = 0, 99 * 15
    visited = [False] * N
    before_position, cost = 0, 0
    min_production_cost(check_cnt, cost)
    print('#{} {}'.format(test_case + 1, result))