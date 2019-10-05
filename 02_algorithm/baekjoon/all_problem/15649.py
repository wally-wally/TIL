import sys
sys.stdin = open('input_01-04.txt', 'r')

def perm(k, m):
    if k == m + 1:
        print(' '.join(order))
        return
    else:
        for i in range(1, N + 1):
            if not visited[i]:
                visited[i] = True
                order.append(str(arr[i - 1]))
                perm(k + 1, m)
                visited[i] = False
                order.pop()


N, M = map(int, input().split())
arr = [num for num in range(1, N + 1)]
visited = [0] * (N + 1)
order = []
perm(1, M)