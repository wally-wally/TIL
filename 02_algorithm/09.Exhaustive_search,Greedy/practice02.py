# r의 수만큼 for문이 중첩된다.

print('중복순열')
arr = 'ABC'
N = len(arr)
for i in range(N):  # 첫 번째 위치
    for j in range(N):  # 두 번째 위치
        for k in range(N):  # 세 번째 위치
            print(arr[i], arr[j], arr[k])

print('순열')
arr = 'ABC'
N = len(arr)
for i in range(N):  # 첫 번째 위치
    for j in range(N):  # 두 번째 위치
        if j == i: continue
        for k in range(N):  # 세 번째 위치
            if k == i or k == j: continue
            print(arr[i], arr[j], arr[k])

print('조합')
arr = 'ABCDE'
N = len(arr)
for i in range(N):  # 첫 번째 위치
    for j in range(i + 1, N):  # 두 번째 위치
        for k in range(j + 1, N):   # 세 번째 위치
            print(arr[i], arr[j], arr[k])

print('중복조합')
arr = 'ABCDE'
N = len(arr)
for i in range(N):  # 첫 번째 위치
    for j in range(i, N):  # 두 번째 위치
        for k in range(j, N):   # 세 번째 위치
            print(arr[i], arr[j], arr[k])

print('재귀 호출을 통한 순열 생성')
arr = [1, 2, 3, 4]
N = len(arr)

def perm(k):
    if k == N:
        print(arr)
    else:
        for i in range(k, N):
            arr[k], arr[i] = arr[i], arr[k]
            perm(k + 1)
            arr[k], arr[i] = arr[i], arr[k]
perm(0)

print('재귀적 표현을 이용한 조합 표현')
def nCr(n, r):
    if n == r or r == 0: return 1
    return nCr(n - 1, r - 1) + nCr(n - 1, r)

print(nCr(5, 3))
print(nCr(10, 4))


arr = 'ABCDE'
N, R = len(arr), 3
choose = []
def comb(k, s):
    if k == R:
        print(choose)
    else:
        for i in range(s, N):
            choose.append(arr[i])
            comb(k + 1, i + 1)
            choose.pop()

comb(0, 0)