import sys
sys.stdin = open('input_1808.txt', 'r')

import itertools
for tc in range(int(input())):
    N_list = []
    idx = 0
    for num in list(map(int, input().split())):
        if num:
            N_list.append(idx)
        idx += 1
    X = int(input())
    number = 1
    result = 100000
    break_var = 0
    for i in range(1, len(N_list) + 1):
        if break_var: break
        for permutation in itertools.permutations(N_list, i):
            if list(permutation) == [0]: continue
            divide_num = int(''.join([str(n) for n in permutation]))
            if divide_num >= X:
                break_var = 1
                break
            if not X % divide_num:
                result = min(result, len(str(X)) + i)
    print('#{} {}'.format(tc + 1, -1 if result == 100000 else result + 2))