import sys
sys.stdin = open('input_7465.txt', 'r')

def check_village(node):
    visited[node] = True
    info = connect[node]
    temp_list = []
    while True:
        for num in info:
            if not visited[num]:
                visited[num] = True
                for con in connect[num]:
                    temp_list.append(con)
        if not len(temp_list):
            return
        else:
            info = temp_list
            temp_list = []

for tc in range(int(input())):
    N, M = map(int, input().split())
    visited = [False] * (N + 1)
    connect = [[] for _ in range(N + 1)]
    for __ in range(M):
        s, e = map(int, input().split())
        connect[s].append(e)
        connect[e].append(s)
    group_cnt = 0
    for n in range(1, N + 1):
        if not visited[n]:
            visited[n] = True
            group_cnt += 1
            check_village(n)
    print('#{} {}'.format(tc + 1, group_cnt))