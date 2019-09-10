import sys
sys.stdin = open('5102_input.txt', 'r')

def BFS(start):
    global result
    queue.append(start)
    visited[start] = True

    while queue:
        start = queue.pop(0)
        for node in range(1, V + 1):
            if matrix[start][node]:
                if not visited[node]:
                    queue.append(node)
                    visited[node] = True
                    distance[node] = distance[start] + 1 # 굳이 distance 안 쓰고 visited 에 통합하여 사용하는게 깔끔
                    if node == end:
                        result = distance[node]
                        return
    return


T = int(input())

for a in range(T):
    V, E = map(int, input().split())
    matrix = [[0] * (V + 1) for _ in range(V + 1)]
    visited = [False] * (V + 1)
    distance = [0] * (V + 1)

    for _ in range(E):  # 연결상태 연결리스트로 확인
        x, y = map(int, input().split())
        # print(x, y)
        matrix[x][y] = 1
        matrix[y][x] = 1
    start, end = map(int, input().split())

    queue = []
    result = 0
    BFS(start)
    print('#{} {}'.format(a + 1, result))

'''
T = int(input())

for a in range(T):
    V, E = map(int, input().split())
    visited = [0] * V  # 방문여부 확인
    connect = [[] for __ in range(V)]  # 각 노드 간의 연결 지점 확인
    # connect = [[]] * V  = 이렇게 쓰면 connect의 모든 원소가 같은 빈 리스트를 바라봄
    # print(connect)
    for _ in range(E):  # 연결상태 연결리스트로 확인
        x, y = map(int, input().split())
        # print(x, y)
        connect[x - 1].append(y - 1)
        connect[y - 1].append(x - 1)
        print(connect)
    s, e = map(int, input().split())
    start, end = s - 1, e - 1
    iterable = connect[start]

    meet = 0
    step = 1
    while True:
        if meet:
            break
        queue = []
        if step >= 2:
            for item in data:
                if meet:
                    break
                for j in connect[item]:
                    if not visited[j]:
                        visited[j] = True
                        if j == end:
                            print('#{} {}'.format(a + 1, step))
                            meet += 1
                            break
                        else:
                            queue.append(j)
        else:
            for i in iterable:
                if not visited[i]:
                    visited[i] = True
                    if i == end:
                        print('#{} {}'.format(a + 1, step))
                        meet += 1
                        break
                    else:
                        queue.append(i)
        step += 1
        data = queue
'''