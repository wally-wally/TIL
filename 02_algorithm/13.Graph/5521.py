import sys
sys.stdin = open('input_5521.txt', 'r')

def check():
    result, check_var = 0, 0
    queue = [1]
    visit[1] = True
    while queue:
        temp_list = []
        if check_var == 2: return result
        for pop_elem in queue:
            for tmp in G[pop_elem]:
                if not visit[tmp]:
                    visit[tmp] = True
                    result += 1
                    temp_list.append(tmp)
        if not len(temp_list):
            return result
        queue = [temp for temp in temp_list]
        check_var += 1
            
for tc in range(int(input())):
    N, M = map(int, input().split())
    visit = [False] * (N + 1)
    G = [[] for _ in range(N + 1)]
    for _ in range(M):
        a, b = list(map(int, input().split()))
        G[a].append(b)
        G[b].append(a)
    if not len(G[1]):
        print('#{} 0'.format(tc + 1))
        continue
    print('#{} {}'.format(tc + 1, check()))