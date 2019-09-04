import sys
sys.stdin = open('input.txt', 'r')

T = int(input())
for a in range(T):
    M, N = map(int, input().split())
    twin, unicon = 0, 0
    twin = 2 * N - M
    unicon = N - twin
    print('#{} {} {}'.format(a + 1, twin, unicon))