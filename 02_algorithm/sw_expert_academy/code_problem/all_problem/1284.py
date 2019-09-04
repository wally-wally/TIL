import sys
sys.stdin = open('input.txt', 'r')

T = int(input())

for i in range(T):
    P, Q, R, S, W = list(map(int, input().split()))
    a_rate = b_rate = 0
    a_rate = P * W
    b_rate = Q if R >= W else Q + (W - R) * S
    print('#{} {}'.format(i + 1, min(a_rate, b_rate)))