import sys
sys.stdin = open('input_5248.txt', 'r')

from collections import deque

def group_check(n):
    global result
    queue = deque()
    queue.append(n)
    visit[n] = 1
    while queue:
        pop_elem = queue.popleft()
        for tmp in G[pop_elem]:
            if not visit[tmp]:
                visit[tmp] = 1
                queue.append(tmp)
    return 1
    
for tc in range(int(input())):
    N, M = map(int, input().split())
    visit = [0] * (N + 1)
    G = [[] for _ in range(N + 1)]
    pair_data = list(map(int, input().split()))
    for idx in range(M):
        a, b = pair_data[idx * 2], pair_data[idx * 2 + 1]
        G[a].append(b)
        G[b].append(a)
    result = 0
    for i in range(1, N + 1):
        if not visit[i]:
            result += group_check(i)
    print('#{} {}'.format(tc + 1, result))