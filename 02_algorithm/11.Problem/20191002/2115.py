import sys
sys.stdin = open('input_2115.txt', 'r')

import itertools
for tc in range(int(input())):
    N, M, C = map(int, input().split())
    each_max_honey = [0] * (N * N)
    for row in range(N):
        col, honey_bucket = 0, []
        for number in list(map(int, input().split())):
            honey_bucket.append(number)
            if col + 1 >= M:
                honey_square = 0
                for k in range(1, M + 1):
                    for comb in itertools.combinations([num for num in range(M)], k):
                        temp_list = [honey_bucket[com] for com in comb]
                        if sum(temp_list) <= C:
                            square_value = 0
                            for temp in temp_list:
                                square_value += temp ** 2
                            honey_square = max(square_value, honey_square)
                each_max_honey[row * N + col] = honey_square
                honey_bucket.pop(0)
            col += 1
    max_revenue = 0
    for combination in itertools.combinations([n for n in range(N * N)], 2):
        if combination[1] - combination[0] < M: continue
        max_revenue = max(each_max_honey[combination[0]] + each_max_honey[combination[1]], max_revenue)
    print('#{} {}'.format(tc + 1, max_revenue))