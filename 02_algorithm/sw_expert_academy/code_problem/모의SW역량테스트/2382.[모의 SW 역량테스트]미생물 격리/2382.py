import sys
sys.stdin = open('input_2382.txt', 'r')

def merge_microbe(microbe_dists, microbes):
    merge_result, pop_idx = [], []
    for data in microbe_dists.items():
        if len(data[1]) > 1: # 이동 후 한 셀에 두 개 이상 미생물이 있는 경우 미생물 합치기
            pop_idx.extend(data[1])
            temp_microbes, final_direction = [], 0
            for idx in microbe_dists[data[0]]:
                temp_microbes.append(microbes[idx][2])
            final_direction = microbes[microbe_dists[data[0]][temp_microbes.index(max(temp_microbes))]][3]
            new_row, new_col = map(int, data[0].split('-'))
            merge_result.append([new_row, new_col, sum(temp_microbes), final_direction])
    return merge_result, sorted(pop_idx, reverse=True)


def move_microbe(micro_set):
    microbe_dict = dict()
    for idx in range(len(micro_set)):
        # 위쪽 방향(1)으로 이동 중인 경우
        if micro_set[idx][3] == 1:
            new_row, new_col = micro_set[idx][0] - 1, micro_set[idx][1]
            if new_row == 0:
                decrease_microbe = int(micro_set[idx][2] / 2)
                new_direct = 2
            else:
                decrease_microbe = micro_set[idx][2]
                new_direct = micro_set[idx][3]
            micro_set[idx] = [new_row, new_col, decrease_microbe, new_direct]
        # 아래쪽 방향(2)으로 이동 중인 경우
        elif micro_set[idx][3] == 2:
            new_row, new_col = micro_set[idx][0] + 1, micro_set[idx][1]
            if new_row == N - 1:
                decrease_microbe = int(micro_set[idx][2] / 2)
                new_direct = 1
            else:
                decrease_microbe = micro_set[idx][2]
                new_direct = micro_set[idx][3]
            micro_set[idx] = [new_row, new_col, decrease_microbe, new_direct]
        # 왼쪽 방향(3)으로 이동 중인 경우
        elif micro_set[idx][3] == 3:
            new_row, new_col = micro_set[idx][0], micro_set[idx][1] - 1
            if new_col == 0:
                decrease_microbe = int(micro_set[idx][2] / 2)
                new_direct = 4
            else:
                decrease_microbe = micro_set[idx][2]
                new_direct = micro_set[idx][3]
            micro_set[idx] = [new_row, new_col, decrease_microbe, new_direct]
        # 오른쪽 방향(4)으로 이동 중인 경우
        else:
            new_row, new_col = micro_set[idx][0], micro_set[idx][1] + 1
            if new_col == N - 1:
                decrease_microbe = int(micro_set[idx][2] / 2)
                new_direct = 3
            else:
                decrease_microbe = micro_set[idx][2]
                new_direct = micro_set[idx][3]
            micro_set[idx] = [new_row, new_col, decrease_microbe, new_direct]
        idx_key = f'{new_row}-{new_col}'
        if idx_key in microbe_dict:
            microbe_dict[idx_key].append(idx)
        else:
            microbe_dict[idx_key] = [idx]
    merge_result, pop_indexes = merge_microbe(microbe_dict, micro_set)
    for pop_idx in pop_indexes:
        micro_set.pop(pop_idx)
    for mer_res in merge_result:
        micro_set.append(mer_res)
    return micro_set


for tc in range(int(input())):
    N, M, K = map(int, input().split())
    microbe_set = [list(map(int, input().split())) for _ in range(K)]
    run_idx = 1
    while run_idx <= M:
        microbe_set = move_microbe(microbe_set)
        run_idx += 1
    result = sum(list(map(lambda x: x[2], microbe_set)))
    print('#{} {}'.format(tc + 1, result))