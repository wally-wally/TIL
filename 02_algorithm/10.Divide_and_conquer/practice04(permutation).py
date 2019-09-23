# 순열 생성
arr = 'ABC'
N = len(arr)
order = [0] * N
# visit = [False] * N
def perm(a, k, n, visit):
    if k == n:
        print(a)
        # for idx in a:
        #     print(arr[idx], end='')
        # print()
    else:
        # visit = [False] * n
        # for i in range(k):
        #     visit[a[i]] = True
        for i in range(n):
            # if visit[i]: continue
            if visit & (1 << i): continue
            # visit[i] = True
            a[k] = i
            # perm(a, k + 1, n)
            perm(a, k + 1, n, visit | (1 << i))
            # visit[i] = False
   
perm(order, 0, N, 0)