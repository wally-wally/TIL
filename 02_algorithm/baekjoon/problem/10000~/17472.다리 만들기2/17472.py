import sys
sys.stdin = open('input_17472.txt', 'r')

# from pprint import pprint

N, M = map(int, input().split())
MAP = [list(map(int, input().split())) for _ in range(N)]
visited = [[0] * M for _ in range(N)]
islands, island_No = [[]], 0

# (1) 좌표당 섬 번호 부여
for i in range(N):
    for j in range(M):
        if MAP[i][j] == 0 or visited[i][j]: continue
        island_No += 1
        point = [(i, j)]        
        visited[i][j] = 1
        cnt = 0
        while cnt < len(point):
            x, y = point[cnt]
            MAP[x][y] = island_No
            for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                tx, ty = x + dx, y + dy
                if 0 <= tx < N and 0 <= ty < M and MAP[tx][ty] and not visited[tx][ty]:
                    point.append((tx, ty))
                    visited[tx][ty] = 1
            cnt += 1
        islands.append(point)

# (2) 각 섬에서 다른 섬 사이의 거리의 최소값 저장
# G[a][b] : 번호가 a인 섬에서 b인 섬까지 거리의 최소값
G = [[100] * (island_No + 1) for _ in range(island_No + 1)] # 한 변의 최대 길이가 100이므로 모든 원소를 100으로 설정
for i in range(1, island_No + 1):
    for x, y in islands[i]:
        d = 0
        for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
            tx, ty = x + dx, y + dy
            distance = 0
            while 0 <= tx < N and 0 <= ty < M:
                if MAP[tx][ty] == i: break # 자기 자신과 같은 번호인 경우 섬 내부에서 이동한 것이므로 break
                if MAP[tx][ty]: # 자기 자신과 다른 1 이상의 수를 만났을 때 수행
                    if 1 < distance < G[i][MAP[tx][ty]]: # 거리가 2 이상일 때 다리 설립 가능
                        G[i][MAP[tx][ty]] = G[MAP[tx][ty]][i] = distance
                    break
                distance += 1
                tx, ty = tx + dx, ty + dy
# pprint(G)

# (3) Kruskal 알고리즘으로 최소신장트리(MST) 구하기
EDGE = []
for i in range(1, island_No):
    for j in range(1, island_No + 1):
        if G[i][j] != 100:
            EDGE.append((i, j, G[i][j]))

EDGE.sort(key = lambda x: x[2])
# print(EDGE)

p = [x for x in range(island_No + 1)]
def find_set(x):
    if x != p[x]:
        p[x] = find_set(p[x])
    return p[x]

# group을 섬의 총 개수에서 시작하여 1씩 감소함으로써 1이 되면 모든 섬들이 연결되었다는 의미
# group이 1이 안 되는 경우 섬 몇 개가 연결이 안 되었다는 의미이므로 -1 출력
result, cur, group = 0, 0, island_No
for u, v, w in EDGE:
    a = find_set(u); b = find_set(v)
    if a != b:
        p[b] = a
        result, cur, group = result + w, cur + 1, group - 1
        if cur == island_No - 1: break

print(result if group == 1 else -1)