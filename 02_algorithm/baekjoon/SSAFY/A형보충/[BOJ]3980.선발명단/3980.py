import sys
sys.stdin = open('input_3980.txt', 'r')

def comb(k):
    global result
    if k == 11:
        result = max(sum(order), result)
        return
    else:
        for i in range(11):
            if not visited[i] and arr[k][i]:
                visited[i] = True
                order.append(arr[k][i])
                comb(k + 1)
                visited[i] = False
                order.pop()

C = int(input())
for _ in range(C):
    arr = [list(map(int, input().split())) for _ in range(11)]
    visited = [False] * 11
    order = []
    result = 0
    comb(0)
    print(result)