import sys
sys.stdin = open('input_1952.txt', 'r')

def three_month(s):
    global result
    check_value, flag = 0, 0
    for m in range(14):
        if visited[m]:
            flag += 1
        if flag == 3:
            check_value += each_rate[2]
            flag = 0
        elif flag == 0:
            check_value += rate_list[m]
    result = min(check_value, result)
    for idx in range(12):
        if not visited[idx]:
            for re_idx in range(idx, idx + 3):
                if visited[re_idx]: break
            else:
                for re_idx in range(idx, idx + 3):
                    visited[re_idx] = 1
                three_month(idx)
                for re_idx in range(idx, idx + 3):
                    visited[re_idx] = 0


for tc in range(int(input())):
    each_rate = list(map(int, input().split()))
    plan_list = list(map(int, input().split()))
    # 1일 이용권 & 1달 이용권 & 1년 이용권 요금 비교
    rate_list = [min(plan * each_rate[0], each_rate[1]) for plan in plan_list] + [0, 0]
    result = min(sum(rate_list), each_rate[3])

    # 3달 이용권 비교
    visited = [0] * (12 + 2)
    for i in range(12):
        for j in range(i, i + 3):
            visited[j] = 1
        three_month(i)
        for k in range(i, i + 3):
            visited[k] = 0

    print('#{} {}'.format(tc + 1, result))