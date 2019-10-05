import sys
sys.stdin = open('sample_input_4881.txt', 'r')

def perm(idx, count, visit, Sum):
    global arr, result
    if Sum > result:
        return
    if count >= idx:
        result = min(result, Sum)
        return
    for i in range(idx):
        if visit[i] == 1:
            continue
        visit[i] = 1
        perm(idx, count + 1, visit, Sum + arr[count][i])
        visit[i] = 0

T = int(input())
for i in range(T):
    N = int(input())
    arr = [list(map(int,input().split())) for j in range(N)]
    visit = [0] * N
    result = 10000000
    perm(N, 0, visit, 0)
    
    print('#{} {}'.format(i + 1, result))

'''
import itertools
T = int(input())
for a in range(T):
    N = int(input())
    N_list = [i+1 for i in range(N)]
    arr = [list(map(int, input().split())) for b in range(N)]
    # perm = itertools.permutations(N_list)
    min_value = 1e10
    # print(perm)
    for j in itertools.permutations(N_list):
        Sum = 0
        for k in range(N):
            Sum += arr[k][j[k]-1]
        if min_value >= Sum:
            min_value = Sum
        # print(min_value)
    print('#{} {}'.format(a + 1, min_value))


def permute(arr): # 순열 생성
    result = [arr[:]]
    c = [0] * len(arr)
    i = 0
    while i < len(arr):
        if c[i] < i:
            if i % 2 == 0:
                arr[0], arr[i] = arr[i], arr[0]
            else:
                arr[c[i]], arr[i] = arr[i], arr[c[i]]
            result.append(arr[:])
            c[i] += 1
            i = 0
        else:
            c[i] = 0
            i += 1
    return result

T = int(input())

for a in range(T):
    N = int(input())
    N_list = [b + 1 for b in range(N)]
    arr = [list(map(int, input().split())) for _ in range(N)]
    perm_list = permute(N_list)
    print(perm_list)
    min_value = 1e11
    for perm in perm_list:
        # print(perm)
        Sum = 0
        for i in range(N):
            # print(Sum, arr[i], perm[i])
            Sum += arr[i][perm[i]-1]
        if min_value >= Sum:
            min_value = Sum
    print('#{} {}'.format(a + 1, min_value))
'''