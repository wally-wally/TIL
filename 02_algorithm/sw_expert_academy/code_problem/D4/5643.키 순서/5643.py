import sys
sys.stdin = open('input_5643.txt', 'r')

def BFS(i, adj_list, visit):
    queue = [i]
    connect_cnt = 0
    while queue:
        elem = queue.pop(0)
        for idx in adj_list[elem]:
            if not visit[idx]:
                visit[idx] = True
                connect_cnt += 1
                queue.append(idx)
    return connect_cnt

for tc in range(int(input())):
    N, M, result = int(input()), int(input()), 0 # N: 학생 수, M: 비교 횟수, result: 최종 출력

    # 정방향, 역방향 인접 리스트 생성
    higher_adj = [[] for _ in range(N + 1)] # 정방향(본인보다 큰 경우)
    shorter_adj = [[] for _ in range(N + 1)] # 역방향(본인보다 작은 경우)

    # 주어진 M개의 비교 정보를 이용하여 각 인접 리스트에 요소 추가
    for _ in range(M):
        a, b = map(int, input().split())
        higher_adj[a].append(b)
        shorter_adj[b].append(a)

    # for 문으로 모든 정점에 대해 본인보다 큰 경우, 작은 경우 계산
    for idx in range(1, N + 1):
        visited = [False] * (N + 1)
        high_cnt = BFS(idx, higher_adj, visited)
        short_cnt = BFS(idx, shorter_adj, visited)
        if high_cnt + short_cnt + 1 == N:
            result += 1
    
    print('#{} {}'.format(tc + 1, result))