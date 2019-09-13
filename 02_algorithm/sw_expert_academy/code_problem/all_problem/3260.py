import sys
sys.stdin = open('input.txt', 'r')

for t in range(int(input())):
    n1, n2 = map(str, input().split())
    print('#{} {}'.format(t + 1, int(n1) + int(n2)))