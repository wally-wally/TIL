import sys
sys.stdin = open('input.txt', 'r')

for T in range(int(input())):
    N, M = map(int, input().split())
    a_set = set(list(map(str, input().split())))
    b_set = set(list(map(str, input().split())))
    print('#{} {}'.format(T + 1, len(a_set & b_set)))