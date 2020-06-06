import sys
sys.stdin = open('input_2112.txt', 'r')

import itertools

def check_film(film):
    for col in range(W):
        film_col_line = list(zip(*film))[col]
        for i in range(D - K + 1):
            if len(set(film_col_line[i : i + K])) == 1:
                break
        else:
            return False
    return True


for tc in range(int(input())):
    D, W, K = map(int, input().split())
    protected_film = [list(map(int, input().split())) for _ in range(D)]
    if K == 1:
        print('#{} {}'.format(tc + 1, 0))
        continue
    if check_film(protected_film):
        print('#{} {}'.format(tc + 1, 0))
    else:
        break_var = 0
        input_count = 0
        while input_count < K:
            input_count += 1
            for medication_group in itertools.product((0, 1), repeat=input_count):
                if break_var: break
                for comb in itertools.combinations(range(D), input_count):
                    if break_var: break
                    for film_line in zip(*protected_film):
                        film_line = list(film_line)
                        for idx in range(input_count):
                            film_line[comb[idx]] = medication_group[idx]
                        for col in range(D - K + 1):
                            temp_value = film_line[col]
                            for dy in range(1, K):
                                if temp_value != film_line[col + dy]:
                                    break
                            else:
                                break
                        else:
                            break
                    else:
                        print('#{} {}'.format(tc + 1, input_count))
                        break_var = 1
                        break
            if break_var: break
        if not break_var:
            print('#{} {}'.format(tc + 1, K))