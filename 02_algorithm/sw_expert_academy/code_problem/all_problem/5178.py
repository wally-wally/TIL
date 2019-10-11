import sys
sys.stdin = open('input_5178.txt', 'r')

for tc in range(int(input())):
    N, M, L = map(int, input().split())
    arr = [0] * (N + 1)
    if not N % 2:
        arr += [0]
    for _ in range(M):
        idx, val = map(int, input().split())
        arr[idx] = val
    for i in range(N - 1 if N % 2 else N, 0, -2):
        arr[i // 2] = arr[i] + arr[i + 1]
    print('#{} {}'.format(tc + 1, arr[L]))