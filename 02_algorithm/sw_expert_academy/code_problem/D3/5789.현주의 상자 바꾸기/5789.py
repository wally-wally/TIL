import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())

for a in range(T):
    N, Q = map(int, input().split())
    arr = ['0' for b in range(N)]
    for c in range(Q):
        L, R = map(int, input().split())
        for d in range(L-1, R):
            arr[d] = str(c+1)
    print('#{} {}'.format(a + 1, ' '.join(arr)))