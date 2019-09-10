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


# 강사님 코드

# def find(adj, n):
#     v = [0] * 101
#     q = [n]
#     v[n] = 1
#     while (len(q) != 0):
#         n = q.pop(0)
#         for i in range(1, 101):
#             if(adj[n][i] == 1 and v[i] == 0):
#                 q.append(i)
#                 v[i] = v[n] + 1 # 레벨 증가
#     maxIdx = 1
#     for i in range(2, 101):
#         if (v[maxIdx] <= v[i]): # 가장 레벨이 큰 인덱스 찾기
#             maxIdx = i
#     return maxIdx
#
#
# for tc in range(1, 11):
#     N, S = map(int, input().split())
#     a = [[0]*101 for i in range(102)]
#     lst = list(map(int, input().split()))
#
#     for i in range(N//2):
#         a[lst[i*2]][lst[i*2+1]] = 1 # 인접 행렬 작성
#     print('#{} {}'.format(tc, find(a, S)))