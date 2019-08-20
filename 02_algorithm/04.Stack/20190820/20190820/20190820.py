import sys
sys.stdin = open('input.txt', 'r')

def DFS(v):
    # global zero_list
    print(v, end=' ')
    for number in zero_list:
        for w in G[number]:
            if put_in[w]:
                put_in[w] -= 1
                print(w, end=' ')

    # for w in G[v]:
    #     if put_in[w]:
    #         put_in[w] -= 1
    #         print(put_in)
    #         DFS(w)

for a in range(5):
    print('#{}'.format(a+1), end=' ')
    V, E = map(int, input().split()) # V : 노드 개수, E : 간선 개수
    G = [[] for _ in range(V + 1)]
    # visit = [False] * (V + 1)
    put_in = [0] * (V + 1) # 진입차수
    result = ''

    connect_info = list(map(int, input().split()))
    arr = []
    for b in range(0, E * 2, 2):
        element = []
        for c in range(b, b + 2):
            element.append(connect_info[c])
        arr.append(element)
    # print(arr)

    for d in arr:
        u, v = d[0], d[1]
        G[u].append(v)
        put_in[v] += 1
    print(G, put_in)
    # zero_count = put_in.count(0) - 1
    # print(zero_count)
    # count = 0

    # zero_list = []
    # for idx in range(1, V + 1):
    #     # print(count)
    #     # print(put_in[idx])
    #     if put_in[idx] == 0:
    #         zero_list.append(idx)
    #         num = idx
    #         result += str(idx) + ' '
    #         # count += 1
    #         # if zero_count != count:
    #         #     num = idx
    #         #     print(idx, end=' ')
    #         #     # count += 1
    # # for elem in zero_list:
    # #     for g in G[elem]:
    # #         put_in[g] -= 1
    # if zero_count-1:
    #     print(result[:2*(zero_count-1)-1], end = ' ')
    # DFS(num)
    # print()

'''
for t in range(5):
    V, E = map(int, input().split())
    data = list(map(int, input().split()))
    G = [[] for i in range(V + 1)]
    put_in = [0] * (V + 1) # 진입차수

    for k in range(0, len(data), 2):
        G[data[k]].append(data[k + 1])
        put_in[data[k + 1]] += 1
    print(G, put_in)

    result = ''
    for i in range(1, V + 1):
        stack = []
        stack.append(i)
        while stack:
            node = stack.pop()
            if put_in[node] > 0:
                put_in[node] -= 1
            elif put_in[node] == 0:
                put_in[node] = 'X'
                result += str(node) + ' '
                stack.extend(G[node])
            print(result, put_in)
    print('#{} {}'.format(t + 1, result))
'''