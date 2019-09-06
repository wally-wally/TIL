import sys
import queue

def bfs():
    visited = {i:0 for i in range(V+1)}
    q = queue.Queue()                           # 큐 생성
    q.put(start)
    visited[start] = 1
    while(q.empty()==False):
        n = q.get()             # 방문할 노드를 큐에서 꺼냄
        for t in adj[n]:            # n의 인접 노드 중
            if visited[t] == 0:     #  방문안한 노드를 큐에 추가                    
                q.put(t)
                visited[t] = visited[n] + 1     # 거리 누적
                if t == end:
                    return visited[t] - 1           # 출발지가 1부터 시작하므로 1을 빼줌
    return 0                                            # 경로가 없는 경우

sys.stdin = open('input.txt', 'r')
T = int(input())
for tc in range(1, T+1):
    V, E = map(int, input().split())
    adj = {i:[] for i in range(1,V+1)}      # 인접리스트 초기화
    for i in range (E):
        n1, n2 = map(int, input().split())
        adj[n1].append(n2)                      # 무향 그래프의 인접 리스트
        adj[n2].append(n1)
    start, end = map(int, input().split())

    print('#{} {}'.format(tc, bfs()))
