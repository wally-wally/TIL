import sys
sys.stdin = open('input_3980.txt', 'r')

def select_player(chk_cnt, val):
    global result
    if chk_cnt == 10:
        if val >= result:
            result = val
            return    
        else:
            return
    for number in stat_able[chk_cnt + 1]:
        if not used[number]:
            used[number] = True
            select_player(chk_cnt + 1, val + arr[chk_cnt + 1][number])
            used[number] = False
    return


C = int(input())
for _ in range(C):
    arr = [list(map(int, input().split())) for _ in range(11)]
    stat_able = [[] for _ in range(11)]
    for a in range(11):
        for b in range(11):
            if arr[b][a]:
                stat_able[a].append(b)
    used = [False] * 11
    check_cnt = -1
    final_result = 0
    # print(arr)
    # print(stat_able)
    for No in stat_able[0]:
        check_cnt, result = 0, 0
        if not used[No]:
            used[No] = True
            check_cnt += 1
            Sum_value = arr[No][0]
            select_player(check_cnt, Sum_value)
            used[No] = False
        if final_result <= result:
            final_result = result
    print(final_result)