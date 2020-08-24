import sys
sys.stdin = open('input_10200.txt', 'r')

for tc in range(int(input())):
    N, A, B = map(int, input().split())
    print('#{} {} {}'.format(tc + 1, min(A, B), 0 if A + B <= N else A + B - N))