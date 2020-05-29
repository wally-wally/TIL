import sys
sys.stdin = open('input_7569.txt', 'r')

def ripe_tomato():
    effect_idx = []
    for idx in effect_tomato_list:
        if tomato_boxes[idx[0]][idx[1]][idx[2]] == 1:
            for i in range(6):
                new_h, new_n, new_m = idx[0] + dz[i], idx[1] + dx[i], idx[2] + dy[i]
                if 0 <= new_h < H and 0 <= new_n < N and 0 <= new_m < M:
                    if tomato_boxes[new_h][new_n][new_m] == 0:
                        if visited[new_h][new_n][new_m] < 1:
                            effect_idx.append((new_h, new_n, new_m))
                            visited[new_h][new_n][new_m] = 1
    return effect_idx


M, N, H = map(int, input().split())
not_ripe_tomato_cnt = 0
tomato_boxes, effect_tomato_list = [], []
for h in range(H):
    tomato_box = []
    for n in range(N):
        tomato_line = list(map(int, input().split()))
        for m in range(M):
            if tomato_line[m] == 0:
                not_ripe_tomato_cnt += 1
            elif tomato_line[m] == 1:
                effect_tomato_list.append((h, n, m))
        tomato_box.append(tomato_line)
    tomato_boxes.append(tomato_box)

visited = tomato_boxes
dx, dy, dz = (-1, 0, 1, 0, 0, 0), (0, 1, 0, -1, 0, 0), (0, 0, 0, 0, 1, -1)

if not_ripe_tomato_cnt == 0:
    print(0)
else:
    day  = 0
    while True:
        day += 1
        effect_tomato = ripe_tomato()
        not_ripe_tomato_cnt -= len(effect_tomato)
        if not_ripe_tomato_cnt == 0:
            print(day)
            break
        if len(effect_tomato) == 0:
            print(-1)
            break
        for idx in effect_tomato:
            tomato_boxes[idx[0]][idx[1]][idx[2]] = 1
        effect_tomato_list = effect_tomato