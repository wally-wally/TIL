import sys
sys.stdin = open('input_1953.txt', 'r')

def BFS(r, c): # BFS로 각 파이프 종류에 따라 이동할 수 있는지 없는지 확인하여 time이 L이 될 때까지 파이프 개수(reuslt) + 1
    result, time = 1, 1
    queue = [(r, c)]
    visited[r][c] = 1
    while queue:
        time += 1
        temp_list = []
        for elem in queue:
            value = arr[elem[0]][elem[1]]
            for k in direction[value]:
                new_r, new_c = elem[0] + dx[k], elem[1] + dy[k]
                if 0 <= new_r < N and 0 <= new_c < M:
                    if arr[new_r][new_c] > 0:
                        if not visited[new_r][new_c] and arr[new_r][new_c] in connect[k]:
                            result += 1
                            temp_list.append((new_r, new_c))
                            visited[new_r][new_c] = 1
        if time == L:
            return result
        else:
            queue = [temp for temp in temp_list]
    return result

dx, dy = [-1, 0, +1, 0], [0, +1, 0, -1] # 상 우 하 좌
# connect : 상 우 하 좌 방향으로 연결될 수 있는 파이프 종류들
connect = [[1, 2, 5, 6], [1, 3, 6, 7], [1, 2, 4, 7], [1, 3, 4, 5]]
# direction : 각 파이프 종류에 따른 구멍의 위치 (상 - 0, 우 - 1, 하 - 2, 좌 - 3)
# BFS 에서 이 값들이 다음 이동할 위치를 계산할 때 dx, dy의 인덱스 값으로 쓰일 요소들임
direction = [[], [0, 1, 2, 3], [0, 2], [1, 3], [0, 1], [1, 2], [2, 3], [0, 3]]
for tc in range(int(input())):
    N, M, R, C, L = map(int, input().split())
    arr = [list(map(int, input().split())) for _ in range(N)]
    visited = [[0] * M for _ in range(N)]
    print('#{} {}'.format(tc + 1, 1 if L == 1 else BFS(R, C))) # L = 1인 경우 답은 1로 고정