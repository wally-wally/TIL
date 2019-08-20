import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())

for a in range(T):
    N = int(input())
    num = 0
    result = 1 # N = 10일 때 1가지 경우가 있다고 시작
    sign = -1
    while True:
        num += 1
        if N == num * 10:
            print('#{} {}'.format(a + 1, result))
            break
        else:
            value = result
            sign *= -1
            result = value * 2 + sign