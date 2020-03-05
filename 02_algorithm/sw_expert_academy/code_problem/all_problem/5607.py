import sys
sys.stdin = open('input_5607.txt', 'r')

# 출처 : https://5stralia.tistory.com/4
# 페르마의 소정리를 이용한 풀이
m = 1234567891
def x_y(x, y):
    xy = 1
    while y > 0:
        if y % 2 == 1:
            xy *= x
            y -= 1
            xy %= m
        x *= x
        x %= m
        y /= 2
    return xy

for tc in range(int(input())):
    N, R = map(int, input().split())
    r1, r2 = 1, 1
    for i in range(1, N + 1):
        r1 *= i
        r1 %= m
    for i in range(1, R+1):
        r2 *= i
        r2 %= m
    for i in range(1, N - R + 1):
        r2 *= i
        r2 %= m  
    r2 = x_y(r2, m - 2)
    r2 %= m
    r1 *= r2
    r1 %= m
    print('#{} {}'.format(tc + 1, r1))