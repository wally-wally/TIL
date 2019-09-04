import sys
sys.stdin = open('input.txt', 'r')

T = int(input())

for i in range(T):
    num = int(input())
    Sum = 0
    for j in range(1, num+1):
        if j & 1:
            Sum += j
        else:
            Sum -= j
    print('#{} {}'.format(i+1, Sum))