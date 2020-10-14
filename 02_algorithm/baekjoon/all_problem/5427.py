import sys
sys.stdin = open('input_5427.txt', 'r')

from collections import deque

dx, dy = (-1, 0, 1, 0), (0, 1, 0, -1)

def escape_building():
    # x좌표, y좌표, 불(1)인지 사람(0)인지 체크
    positions.append((my_position_x, my_position_y, 0))
    building[my_position_x][my_position_y] = 1
    while positions:
        x, y, check = positions.popleft()
        for i in range(4):
            new_x, new_y = x + dx[i], y + dy[i]
            if 0 <= new_x < h and 0 <= new_y < w:
                if building[new_x][new_y] != '#' and building[new_x][new_y] == 0:
                    building[new_x][new_y] = building[x][y] + 1
                    positions.append((new_x, new_y, check))
            else:
                if check == 0:
                    return building[x][y]
    return 'IMPOSSIBLE'


for _ in range(int(input())):
    w, h = map(int, input().split())
    positions = deque()
    my_position_x, my_position_y = 0, 0

    building = []
    for i in range(h):
        building_line = []
        input_line = input()
        for j in range(w):
            if input_line[j] == '*': # 불
                positions.append((i, j, 1))
                building_line.append(1)
            elif input_line[j] == '@': # 상근
                my_position_x, my_position_y = i, j
                building_line.append(0)
            elif input_line[j] == '#': # 벽
                building_line.append('#')
            else: # 바닥
                building_line.append(0)
        building.append(building_line)
    
    print(escape_building())