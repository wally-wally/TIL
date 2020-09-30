import sys
sys.stdin = open('input_3408.txt', 'r')

for tc in range(int(input())):
    N = int(input())
    s1 = divmod(N * (N + 1), 2)[0]
    s3 = s1 * 2
    s2 = s3 - N
    print('#{} {} {} {}'.format(tc + 1, s1, s2, s3))