import sys
sys.stdin = open('input_4613.txt', 'r')

import itertools

for test_case in range(int(input())):
    N, M = map(int, input().split())
    origin_flag = [input() for _ in range(N)]
    result = N * M
    for element in list(itertools.combinations_with_replacement(['W', 'B', 'R'], N - 3)):
        color_list = [1, 1, 1]
        for elem in element:
            if elem == 'W':
                color_list[0] += 1
            elif elem == 'B':
                color_list[1] += 1
            else:
                color_list[2] += 1
        temp_flag = origin_flag
        start_var, Sum_value = 0, 0
        for idx in range(3):
            end_var = start_var + color_list[idx]
            for i in range(start_var, end_var):
                if idx == 0:
                    Sum_value += temp_flag[i].count('R') + temp_flag[i].count('B')
                elif idx == 1:
                    Sum_value += temp_flag[i].count('W') + temp_flag[i].count('R')
                else:
                    Sum_value += temp_flag[i].count('W') + temp_flag[i].count('B')
            start_var = end_var
        if Sum_value <= result:
            result = Sum_value
    print('#{} {}'.format(test_case + 1, result))