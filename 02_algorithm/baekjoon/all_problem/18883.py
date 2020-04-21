import sys
sys.stdin = open('input_18883.txt', 'r')

N, M = map(int, input().split())
for num in range(1, N * M + 1, M):
    print(' '.join([str(n) for n in range(num, num + M)]))