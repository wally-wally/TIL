import sys
sys.stdin = open('input_2817.txt', 'r')

import itertools

for test_case in range(int(input())):
    N, K = map(int, input().split())
    num_list = list(map(int, input().split()))
    result = 0
    for i in range(1, N + 1):
        for elem in itertools.combinations(num_list, i):
            if sum(list(elem)) == K:
                result += 1
    print('#{} {}'.format(test_case + 1, result))