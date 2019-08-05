import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())
for i in range(T):
    a, b, c = list(map(int, input().split()))
    if a == b == c:
        print('#{} {}'.format(i+1, a))
    elif a == b:
        print('#{} {}'.format(i+1, c))
    elif a == c:
        print('#{} {}'.format(i+1, b))
    elif b == c:
        print('#{} {}'.format(i+1, a))