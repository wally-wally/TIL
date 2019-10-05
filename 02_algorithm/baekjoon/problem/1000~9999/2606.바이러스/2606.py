import sys
sys.stdin = open('input_2606.txt', 'r')

def virus_DFS(k):
    visited[k] = True
    for node in connect_info[k]:
        if not visited[node]:
            virus_DFS(node)

computer_cnt = int(input())
connect_cnt = int(input())
connect_info = [[] for _ in range(computer_cnt + 1)]
visited = [False] * (computer_cnt + 1)
for cnt in range(connect_cnt):
    S, E = map(int, input().split())
    connect_info[S].append(E)
    connect_info[E].append(S)
virus_DFS(1)
print(sum(visited)-1)