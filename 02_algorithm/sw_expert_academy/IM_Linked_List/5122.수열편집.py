import sys
sys.stdin = open('input_5122.txt', 'r')

T = int(input())

for a in range(T):
    N, M, L = map(int, input().split())
    arr = list(map(int, input().split()))
    for _ in range(M):
        situation = list(map(str, input().split()))
        if situation[0] == 'I':
            arr.insert(int(situation[1]), int(situation[2]))
        elif situation[0] == 'D':
            arr.pop(int(situation[1]))
        elif situation[0] == 'C':
            arr[int(situation[1])] = int(situation[2])
    try:
        print('#{} {}'.format(a + 1, arr[L]))
    except IndexError:
        print('#{} -1'.format(a + 1))