def BFS(lst):
    visited = [0] * (max(adj_list) - 1)
    queue = []
    for j in range(len(arr)):
        for k in range(len(arr)):
            pass

'''
    queue.append(v)
    while queue:
        t = queue.pop(0)
        if not visited[t]:
            visited[t] = True
            visit(t)
        for i in G[t]:
            if not visited[i]:
                queue.append(i)
'''

adj_list = [1, 2, 1, 3, 2, 4, 2, 5, 4, 6, 5, 6, 6, 7, 3, 7]
length = len(adj_list) # 16 => 8
arr = []
for i in range(max(adj_list)):
    arr.append([0] * max(adj_list))
for a in range(0, length // 2, 2):
    arr[adj_list[a] - 1][adj_list[a + 1] - 1] = 1
    arr[adj_list[a + 1] - 1][adj_list[a] - 1] = 1
BFS(arr)