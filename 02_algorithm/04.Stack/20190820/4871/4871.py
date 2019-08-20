import sys
sys.stdin = open('sample_input.txt', 'r')

def DFS(start):
    global result
    for i in range(V + 1):
        if result:
            return result
            break
        if matrix[start][i]:
            if i == G:
                result = 1
                break
            else:
                DFS(i)
    else:
        return 0

T = int(input())

for a in range(T):
    result = 0
    V, E = map(int, input().split())
    matrix = [[0] * (V + 1) for _ in range(V + 1)]
    # print(matrix)
    for b in range(E):
        u, v = map(int, input().split())
        matrix[u][v] += 1
    # print(matrix)
    S, G = map(int, input().split())
    print('#{} {}'.format(a + 1, DFS(S)))