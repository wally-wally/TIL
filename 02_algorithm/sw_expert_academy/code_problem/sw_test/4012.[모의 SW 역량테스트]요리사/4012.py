import sys
sys.stdin = open('sample_input.txt', 'r')

import itertools

def synergy(ingredient_list):
    global synergy_sum
    if len(ingredient_list) == 2:
        synergy_sum += (arr[ingredient_list[0]][ingredient_list[1]] + arr[ingredient_list[1]][ingredient_list[0]])
        return synergy_sum
    else:
        cnt = len(list(itertools.combinations(ingredient_list, 2)))
        check = 0
        for sel_list in itertools.combinations(ingredient_list, 2):
            check += 1
            if check == cnt:
                return synergy(list(sel_list))
            else:
                synergy(list(sel_list))

for a in range(int(input())):
    N = int(input())
    arr = [list(map(int, input().split())) for _ in range(N)]
    num_list = [num for num in range(N)]
    A_list, B_list = [], []
    power_list = []
    count = 0
    length = len(list(itertools.combinations(num_list, N // 2)))
    for select_list in itertools.combinations(num_list, N // 2):
        A_list = list(select_list)
        B_list = list(set(num_list) - set(A_list))
        synergy_sum = 0
        A_synergy = synergy(A_list)
        synergy_sum = 0
        B_synergy = synergy(B_list)
        power_list.append(abs(A_synergy - B_synergy))
        count += 1
        if count == length // 2:
            break
    print('#{} {}'.format(a + 1, min(power_list)))    