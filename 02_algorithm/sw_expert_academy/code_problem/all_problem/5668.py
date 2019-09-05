import sys
sys.stdin = open('input.txt', 'r')

T = int(input())

for a in range(T):
    N = int(input())
    i = 0
    result = 0
    while True:
        if i ** 3 == N:
            result = i
            break
        elif i ** 3 > N:
            result = -1
            break
        i += 1
    print('#{} {}'.format(a + 1, result))