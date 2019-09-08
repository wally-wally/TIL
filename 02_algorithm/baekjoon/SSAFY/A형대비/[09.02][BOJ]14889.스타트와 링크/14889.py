import sys
sys.stdin = open('input_14889.txt', 'r')

import itertools

def synergy(people_list):
    global synergy_sum
    if len(people_list) == 2:
        synergy_sum += (arr[people_list[0]][people_list[1]] + arr[people_list[1]][people_list[0]])
        return synergy_sum
    else:
        cnt = len(list(itertools.combinations(people_list, 2)))
        check = 0
        for sel_list in itertools.combinations(people_list, 2):
            check += 1
            if check == cnt:
                return synergy(list(sel_list))
            else:
                synergy(list(sel_list))

N = int(input())
arr = [list(map(int, input().split())) for _ in range(N)]
num_list = [num for num in range(N)]
start_team, link_team = [], []
power_list = []
count = 0
length = len(list(itertools.combinations(num_list, N // 2)))
for select_list in itertools.combinations(num_list, N // 2):
    start_list = list(select_list)
    link_list = list(set(num_list) - set(start_list))
    synergy_sum = 0
    start_synergy = synergy(start_list)
    synergy_sum = 0
    link_synergy = synergy(link_list)
    power_list.append(abs(start_synergy - link_synergy))
    count += 1
    if count == length // 2:
        break
print(min(power_list))