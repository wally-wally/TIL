import sys
sys.stdin = open('input_19236.txt', 'r')

import copy

def move(x, y, fish_map, fish_data, now_fish, shark_dir):
    global eating_fishes_num
    # 물고기 이동
    for fish in fish_data:
        r, c, d = fish_data[fish]
        for i in range(d, d + 8):
            new_r, new_c = r + dx[i % 8], c + dy[i % 8]
            if 0 <= new_r < 4 and 0 <= new_c < 4:
                if fish_map[new_r][new_c] > 0:
                    old_info, new_info = copy.deepcopy(fish_data[fish]), copy.deepcopy(fish_data[fish_map[new_r][new_c]])
                    fish_data[fish], fish_data[fish_map[new_r][new_c]] = [new_info[0], new_info[1], i % 8], [old_info[0], old_info[1], new_info[2]]
                    fish_map[r][c], fish_map[new_r][new_c] = fish_map[new_r][new_c], fish_map[r][c]
                    break
                elif fish_map[new_r][new_c] == 0:
                    fish_data[fish] = [new_r, new_c, i % 8]
                    fish_map[r][c], fish_map[new_r][new_c] = 0, fish_map[r][c]
                    break
    # 상어 이동
    for times in range(1, 4):
        new_x, new_y = x + dx[shark_dir] * times, y + dy[shark_dir] * times
        if new_x < 0 or new_x >= 4 or new_y < 0 or new_y >= 4: break
        if fish_map[new_x][new_y] > 0:
            ori_fish_map = copy.deepcopy(fish_map)
            ori_fish_data = copy.deepcopy(fish_data)
            ori_fish_num = copy.deepcopy(fish_map[new_x][new_y])
            new_shark_dir = copy.deepcopy(fish_data[fish_map[new_x][new_y]][2])
            fish_map[x][y] = 0
            fish_map[new_x][new_y] = -1
            del(fish_data[ori_fish_num])
            move(new_x, new_y, fish_map, fish_data, now_fish + ori_fish_num, new_shark_dir)
            fish_data = ori_fish_data
            fish_map = ori_fish_map
    eating_fishes_num = max(eating_fishes_num, now_fish)
        

dx, dy = (-1, -1, 0, 1, 1, 1, 0, -1), (0, -1, -1, -1, 0, 1, 1, 1)
sea_map, fish_info = [], dict()
for i in range(4):
    line = list(map(int, input().split()))
    map_line = []
    for j in range(0, 8, 2):
        map_line.append(line[j])
        fish_info[line[j]] = [i, j // 2, line[j + 1] - 1]
    sea_map.append(map_line)

# 1행 1열 위치의 물고기 먹고 상어 방향 결정
eating_fishes_num = sea_map[0][0]
shark_direction = fish_info[eating_fishes_num][2]
del(fish_info[eating_fishes_num])
sea_map[0][0] = -1

new_dict = dict()
for info in sorted(fish_info.items()):
    new_dict[info[0]] = info[1]
fish_info = new_dict

move(0, 0, sea_map, fish_info, eating_fishes_num, shark_direction)
print(eating_fishes_num)