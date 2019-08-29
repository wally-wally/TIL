import sys
sys.stdin = open('input.txt', 'r')

def BFS(start):
    global result
    queue.append(start)
    visited[start] = True

    while queue:
        start = queue.pop(0)
        for node in range(1, Max + 1):
            if matrix[start][node]:
                if not visited[node]:
                    queue.append(node)
                    visited[node] = True
                    distance[node] = distance[start] + 1
        result = distance
    return


for a in range(10):
    length, start = map(int, input().split())
    data = list(map(int, input().split()))
    Max = max(data)
    matrix = [[0] * (Max + 1) for _ in range(Max + 1)]
    visited = [False] * (Max +1)
    distance = [0] * (Max + 1)

    for b in range(0, length, 2):
        matrix[data[b]][data[b + 1]] = 1

    queue = []
    result = []
    BFS(start)
    # print(result)
    max_value = 0
    answer = 0
    for i in range(len(result)):
        if result[i] >= max_value:
            max_value = result[i]
            answer = i
    print('#{} {}'.format(a + 1, answer))