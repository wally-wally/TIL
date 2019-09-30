import sys
sys.stdin = open('input_1247.txt', 'r')

# 1. itertools 모듈로 만든 순열 사용
import itertools

for test_case in range(int(input())):
    customer_cnt = int(input())
    customer_idx = [num for num in range(1, customer_cnt + 1)]
    position_info = list(map(int, input().split()))
    position_list = []
    for idx in range(customer_cnt + 2):
        if idx == 0:
            company = (position_info[idx * 2], position_info[idx * 2 + 1])
        elif idx == 1:
            home = (position_info[idx * 2], position_info[idx * 2 + 1])
        else:
            position_list.append((position_info[idx * 2], position_info[idx * 2 + 1]))
    position_list.insert(0, company)
    position_list.append(home)
    result = 10**8
    for perm in itertools.permutations(customer_idx, customer_cnt):
        perm = list(perm) + [customer_cnt + 1]
        distance_value = 0
        comb_length = 0
        for i in range(len(perm)):
            if distance_value > result:
                break
            if comb_length == 0:
                distance_value += abs(position_list[0][0] - position_list[perm[i]][0]) + abs(position_list[0][1] - position_list[perm[i]][1])
            elif comb_length == customer_cnt + 1:
                distance_value += abs(position_list[-1][0] - position_list[perm[i]][0]) + abs(position_list[-1][1] - position_list[perm[i]][1])
            else:
                distance_value += abs(position_list[perm[i - 1]][0] - position_list[perm[i]][0]) + abs(position_list[perm[i - 1]][1] - position_list[perm[i]][1])
            comb_length += 1
        if distance_value <= result:
            result = distance_value
    print('#{} {}'.format(test_case + 1, result))


# 2. 재귀 함수를 이용해 만든 순열 이용
'''
def perm(k):
    global result, order
    if k == customer_cnt + 1:
        distance_value = 0
        comb_length = 0
        order = order + [customer_cnt + 1]
        for i in range(customer_cnt + 1):
            if distance_value > result:
                break
            if comb_length == 0:
                distance_value += abs(position_list[0][0] - position_list[order[i]][0]) + abs(position_list[0][1] - position_list[order[i]][1])
            elif comb_length == customer_cnt + 1:
                distance_value += abs(position_list[-1][0] - position_list[order[i]][0]) + abs(position_list[-1][1] - position_list[order[i]][1])
            else:
                distance_value += abs(position_list[order[i - 1]][0] - position_list[order[i]][0]) + abs(position_list[order[i - 1]][1] - position_list[order[i]][1])
            comb_length += 1
        if distance_value <= result:
            result = distance_value
        order.pop()
        return
    else:
        for i in range(1, customer_cnt + 1):
            if not visited[i]:
                visited[i] = 1
                order.append(customer_idx[i - 1])
                perm(k + 1)
                visited[i] = 0
                order.pop()

for test_case in range(int(input())):
    customer_cnt = int(input())
    customer_idx = [num for num in range(1, customer_cnt + 2)]
    position_info = list(map(int, input().split()))
    position_list = [] # 회사 - 고객들 - 집 순으로 위치 저장함
    for idx in range(customer_cnt + 2):
        if idx == 0:
            company = (position_info[idx * 2], position_info[idx * 2 + 1])
        elif idx == 1:
            home = (position_info[idx * 2], position_info[idx * 2 + 1])
        else:
            position_list.append((position_info[idx * 2], position_info[idx * 2 + 1]))
    position_list.insert(0, company)
    position_list.append(home)
    result = 10**8
    visited = [0] * (customer_cnt + 2)
    order = []
    perm(1)
    print('#{} {}'.format(test_case + 1, result))
'''