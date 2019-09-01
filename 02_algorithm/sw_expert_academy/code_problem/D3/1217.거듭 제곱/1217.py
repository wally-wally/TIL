import sys
sys.stdin = open('input_1217.txt', 'r')

for _ in range(10):
    a = int(input())
    N, M = map(int, input().split())
    print('#{} {}'.format(a, pow(N, M)))