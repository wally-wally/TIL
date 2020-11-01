import sys
sys.stdin = open('input_17144.txt', 'r')

# pypy3로 통과함
def cleaner(position, rotate):
    global purifiend_amount
    direction = -1 if rotate == 0 else 1
    for w in range(position + direction, -1 if rotate == 0 else R, direction):
        if w == position + direction:
            purifiend_amount += after_clean_room[w][0]
            continue
        after_clean_room[w - direction][0] = after_clean_room[w][0]
    for x in range(1, C):
        after_clean_room[0 if rotate == 0 else R - 1][x - 1] = after_clean_room[0 if rotate == 0 else R - 1][x]
    for y in range(1 if rotate == 0 else R - 2, position - direction, -direction):
        after_clean_room[y + direction][C - 1] = after_clean_room[y][C - 1]
    for z in range(C - 2, 0, -1):
        after_clean_room[position][z + 1] = after_clean_room[position][z]
    after_clean_room[position][1] = 0


def diffusion(r, c):
    diffusion_cnt = 0
    for i in range(4):
        if not (0 <= r + dx[i] < R and 0 <= c + dy[i] < C): continue # 방 내부에 있는가?
        if now_room[r + dx[i]][c + dy[i]] == -1: continue# 확산되는 위치에 공기청정기가 없는가?
        diffusion_cnt += 1
        after_clean_room[r + dx[i]][c + dy[i]] += now_room[r][c] // 5
    after_clean_room[r][c] += now_room[r][c] - ((now_room[r][c] // 5) * diffusion_cnt)
            

dx, dy = [-1, 0, 1, 0], [0, 1, 0, -1]
fine_dust, clean_amaount = 0, 0 # 남은 미세먼지 양, 정화된 양
R, C, T = map(int, input().split())
now_room = [[amount for amount in map(int, input().split())] for _ in range(R)] # 현재 방 상태
air_cleaner_position = []
init_dust_amount, purifiend_amount = 0, 0

for t in range(T):
    after_clean_room = [[0 for _ in range(C)] for _ in range(R)] # 정화된 후 방 상태
    # (1) 공기청정기 작동하기 전 미세먼지의 확산
    for n in range(R * C):
        row, col = n // C, n % C
        if now_room[row][col] == -1: # 공기청정기 위치 저장
            after_clean_room[row][0] = -1
            if t == 0:
                air_cleaner_position.append(row)
        elif now_room[row][col] > 0 and now_room[row][col] < 5: # 1 ~ 4인 경우 확산이 안 되므로 현재 값 그대로 저장
            after_clean_room[row][col] += now_room[row][col]
        elif now_room[row][col] >= 5: # 5 이상인 경우 확산 로직 수행
            diffusion(row, col)
        if t == 0 and now_room[row][col] > 0:
            init_dust_amount += now_room[row][col]

    # (2) 공기청정기 작동
    for i in range(2):
        cleaner(air_cleaner_position[i], i)
    now_room = after_clean_room

# 남은 미세먼지 양 계산
print(init_dust_amount - purifiend_amount)