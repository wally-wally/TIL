import sys
sys.stdin = open('input_1949.txt', 'r')

def DFS(row, col, height, length, K_value, construct_var, visit): # 가로 idx, 세로 idx, 다음 이동할 높이, 현재까지 구한 등산로 길이, K 값, 공사 여부 변수, 방문 리스트
    global max_length
    for r, c in [(-1, 0), (0, 1), (1, 0), (0, -1)]: # 동, 서, 남, 북 4방향 체크
        new_row, new_col = row + r, col + c
        if 0 <= new_row < N and 0 <= new_col < N: # 이동한 위치가 등산로 지도 범위 안에 있는지 체크
            if not visit[new_row][new_col]: # 방문 안 한 경우에만 등산로 확장 가능
                if mountain_map[new_row][new_col] < height: # 이동할 등산로 높이가 현재 높이가 작은 경우에만 다음 DFS 수행
                    visit[new_row][new_col] = 1
                    DFS(new_row, new_col, mountain_map[new_row][new_col], length + 1, K_value, construct_var, visit) # 이동했으므로 length에 +1을 더한다.
                    visit[new_row][new_col] = 0
                else:
                    if K_value > 0 and not construct_var: # K가 0인 경우에는 깎는 경우를 고려하지 않아도 되므로 if 문에 K_value > 0 조건 추가 & 공사 안 한 경우(construct_var = 0)만 다음 DFS 수행
                        if mountain_map[new_row][new_col] - K_value < height: # 이동할 위치에서 K 만큼 깎았을 때 그 값이 현재 높이가 작은 경우에만 DFS 수행
                            visit[new_row][new_col] = 1
                            mountain_map[new_row][new_col] -= K_value
                            DFS(new_row, new_col, mountain_map[new_row][new_col], length + 1, K_value, construct_var + 1, visit)
                            mountain_map[new_row][new_col] += K_value
                            visit[new_row][new_col] = 0
    max_length = max(max_length, length) # max()를 이용해 max_length에 최댓값 대입
    return 

for tc in range(int(input())):
    N, K = map(int, input().split()) # N: 한 변의 길이, K: 최대 공사 가능 깊이
    mountain_map = [list(map(int, input().split())) for _ in range(N)] # 지도 정보

    # 지도에서 최대 높이 구하기
    highest_height = 0
    for line in range(N):
        highest_height = max(highest_height, max(mountain_map[line]))

    # 위에서 구한 최대 높이(highest_height)의 위치 정보를 highest_point에 저장
    highest_point = []
    for idx in range(N * N):
        if mountain_map[idx // N][idx % N] == highest_height:
            highest_point.append((idx // N, idx % N))

    # 위에서 구한 최대 높이의 위치 정보 지점만을 기준으로 등산로를 깎지 않았을 때(K = 0)부터 K까지 고려하여 등산로 길이 최댓값 구하기
    max_length = 0 # 등산로 길이 최댓값
    for point in highest_point:
        for k_val in range(K + 1):
            visited = [[0] * N for _ in range(N)]
            visited[point[0]][point[1]] = 1
            DFS(point[0], point[1], highest_height, 1, k_val, 0, visited) # 0 : 공사 여부

    print('#{} {}'.format(tc + 1, max_length))