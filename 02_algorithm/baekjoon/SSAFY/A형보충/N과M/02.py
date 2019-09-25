import sys
sys.stdin = open('input_01-04.txt', 'r')

def perm(k, m):
    global result_list
    if k == m + 1:
        if sorted(order) not in result_list:
            print(' '.join(order))
            result_list.append(sorted(order))
            return
    else:
        for i in range(k, N + 1):
            if not visited[i]:
                visited[i] = True
                order.append(str(arr[i - 1]))
                perm(k + 1, m)
                visited[i] = False
                order.pop()


N, M = map(int, input().split())
arr = [num for num in range(1, N + 1)]
visited = [False] * (N + 1)
result_list, order = [], []
perm(1, M)