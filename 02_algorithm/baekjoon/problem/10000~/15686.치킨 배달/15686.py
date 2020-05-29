import sys
sys.stdin = open('input_15686.txt', 'r')

import itertools

N, M = map(int, input().split())
home_idx, chicken_idx = [], []
city_map = []
# (1) 집, 치킨집 위치 파악
for r in range(N):
    city_line = list(map(int, input().split()))
    for c in range(N):
        if city_line[c] == 1:
            home_idx.append((r, c))
        elif city_line[c] == 2:
            chicken_idx.append((r, c))

# (2) 각 집의 위치를 기준으로 치킨집과의 치킨거리 계산
chicken_distances = [[abs(home[0] - chicken[0]) + abs(home[1] - chicken[1]) for chicken in chicken_idx] for home in home_idx]

# (3) 1 ~ M 개의 치킨집을 고르는 모든 경우 고려
chicken_store_cnt = len(chicken_idx)
answer = 0xffffff
for m in range(1, M + 1):
    for comb in itertools.combinations(range(chicken_store_cnt), m):
        temp_answer = 0
        for distance in chicken_distances:
            temp_answer += min([distance[idx] for idx in comb])
            if answer <= temp_answer:
                break
        else:
            answer = temp_answer
print(answer)