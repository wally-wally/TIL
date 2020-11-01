import sys
sys.stdin = open('input_17141.txt', 'r')

import copy, itertools

def virus_diffusion(comb):
    queue, diffused_virus = [], M
    for idx in comb:
        queue.append((virus_position[idx][0], virus_position[idx][1]))
        copied_lab[virus_position[idx][0]][virus_position[idx][1]] = 3
    time = 3
    next_queue = []
    while True:
        time += 1
        if time - 4 == answer:
            return time - 4
        while queue:
            pop_elem = queue.pop(0)
            for i in range(4):
                new_row, new_col = pop_elem[0] + dx[i], pop_elem[1] + dy[i]
                if 0 <= new_row < N and 0 <= new_col < N:
                    if copied_lab[new_row][new_col] == 0:
                        next_queue.append((new_row, new_col))
                        copied_lab[new_row][new_col] = time
        diffused_virus += len(next_queue)
        if not len(next_queue):
            return time - 4 if diffused_virus == empty_space else 0xffffff
        queue.extend(next_queue)
        next_queue = []


N, M = map(int, input().split())
empty_space, virus_position, laboratory = 0, [], []
for r in range(N):
    lab_line = list(map(int, input().split()))
    for c in range(N):
        if lab_line[c] == 0:
            empty_space += 1
        elif lab_line[c] == 2:
            virus_position.append((r, c))
            lab_line[c] = 0
    laboratory.append(lab_line)
empty_space += len(virus_position)

dx, dy = (-1, 0, 1, 0), (0, 1, 0, -1)
answer = 0xffffff
for comb in itertools.combinations(range(len(virus_position)), M):
    copied_lab = copy.deepcopy(laboratory)
    diffusion_time = virus_diffusion(comb)
    if diffusion_time == 0xffffff: continue
    answer = min(answer, diffusion_time)
print(answer if answer != 0xffffff else -1)