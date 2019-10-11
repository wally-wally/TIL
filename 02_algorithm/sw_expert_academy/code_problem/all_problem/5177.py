import sys
sys.stdin = open('input_5177.txt', 'r')

def heap_check(n):
    p, c = n // 2, n
    while True:
        if c <= 1 or arr[p] < arr[c]: break
        arr[p], arr[c] = arr[c], arr[p]
        c, p = p, c // 2

for tc in range(int(input())):
    N = int(input())
    input_data = list(map(int, input().split()))
    arr = [0] * (N + 1)
    for idx in range(N):
        arr[idx + 1] = input_data[idx]
        heap_check(idx + 1)
    result = 0
    while True:
        N = N // 2
        if N == 0: break
        result += arr[N]
    print('#{} {}'.format(tc + 1, result))