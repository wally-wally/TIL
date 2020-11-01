import sys
sys.stdin = open('input_19238.txt', 'r')

dx, dy = (-1, 0, 1, 0), (0, 1, 0, -1) # 상-우-하-좌

def calc_dist_BFS(taxi_r, taxi_c):
    distances = []
    queue = [(taxi_r, taxi_c)]
    visited = [[-1 for _ in range(N)] for _ in range(N)]
    visited[taxi_r][taxi_c] = 0
    while len(queue) > 0:
        pop_r, pop_c = queue.pop(0)
        for i in range(4):
            new_r, new_c = pop_r + dx[i], pop_c + dy[i]
            if 0 <= new_r < N and 0 <= new_c < N:
                if visited[new_r][new_c] == -1:
                    if road_map[new_r][new_c] == 1: # 벽은 무시
                        continue
                    if road_map[new_r][new_c] == 0:
                        visited[new_r][new_c] = visited[pop_r][pop_c] + 1
                        queue.append((new_r, new_c))
                    elif road_map[new_r][new_c] >= 2:
                        visited[new_r][new_c] = visited[pop_r][pop_c] + 1
                        distances.append((new_r, new_c, road_map[new_r][new_c], visited[new_r][new_c]))
                        queue.append((new_r, new_c))
    return sorted(distances, key=lambda x: (x[3], x[0], x[1]))
                        
N, M, fuel = map(int, input().split())
road_map = [list(map(int, input().split())) for _ in range(N)]
taxi_row, taxi_col = map(int, input().split())
taxi_row -= 1
taxi_col -= 1
passenger_pos, passenger_destination = [], []
passenger_num = 2
for _ in range(M):
    r1, c1, r2, c2 = map(int, input().split())
    passenger_pos.append((r1 - 1, c1 - 1))
    passenger_destination.append((r2 - 1, c2 - 1))
    road_map[r1 - 1][c1 - 1] = passenger_num
    passenger_num += 1

# 1. 각 손님의 위치에서 목적지까지의 거리 미리 계산
passenger_distances = dict()
for i in range(M):
    now_passenger_pos, now_passenger_dest = passenger_pos[i], passenger_destination[i]
    queue = [now_passenger_pos]
    visited = [[-1 for _ in range(N)] for _ in range(N)]
    visited[now_passenger_pos[0]][now_passenger_pos[1]] = 0
    break_var = 0
    while len(queue) > 0:
        pop_r, pop_c = queue.pop(0)
        if break_var:
            break
        for j in range(4):
            new_r, new_c = pop_r + dx[j], pop_c + dy[j]
            if 0 <= new_r < N and 0 <= new_c < N:
                if new_r == now_passenger_dest[0] and new_c == now_passenger_dest[1]:
                    passenger_distances[i + 2] = visited[pop_r][pop_c] + 1
                    break_var = 1
                    break
                if visited[new_r][new_c] == -1:
                    if road_map[new_r][new_c] == 1: # 벽은 무시
                        continue
                    visited[new_r][new_c] = visited[pop_r][pop_c] + 1
                    queue.append((new_r, new_c))

if len(passenger_distances) != M:
    print(-1)
else:
    for _ in range(M):
        # 2. 택시에서 각 승객까지의 거리 계산 후 (거리, 행 번호, 열 번호) 순으로 정렬
        if road_map[taxi_row][taxi_col] >= 2:
            row, col, passenger_number, taxi_distance = taxi_row, taxi_col, road_map[taxi_row][taxi_col], 0
        else:
            temp_dists = calc_dist_BFS(taxi_row, taxi_col) # r, c, 승객 번호(+2 되어 있는 상태), 거리
            if len(temp_dists) == 0:
                print(-1)
                break
            row, col, passenger_number, taxi_distance = temp_dists[0]
        remain_fuel = fuel - taxi_distance - passenger_distances[passenger_number]
        if remain_fuel < 0:
            print(-1)
            break
        fuel = remain_fuel + passenger_distances[passenger_number] * 2
        taxi_row, taxi_col = passenger_destination[passenger_number - 2]
        road_map[row][col] = 0
    else:
        print(fuel)