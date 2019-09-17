import sys
sys.stdin = open('input_5189.txt', 'r')

def electro_kart(chk_cnt, val, bf_posi):
    global ans, N
    if val >= ans:
        return
    if chk_cnt == N - 1:
        val += arr[bf_posi][0]
        if val <= ans:
            ans = val
            return
    for i in range(1, N):
        if not used[i]:
            used[i] = True
            electro_kart(chk_cnt + 1, val + arr[bf_posi][i], i)
            used[i] = False

for test_case in range(int(input())):
    N = int(input())
    arr = [list(map(int, input().split())) for _ in range(N)]
    check_cnt, ans = 0, 100 * 100
    unumber_list = [num for num in range(N)]
    used = [False] * N
    battery, before_position = 0, 0
    electro_kart(check_cnt, battery, before_position)
    print('#{} {}'.format(test_case + 1, ans))