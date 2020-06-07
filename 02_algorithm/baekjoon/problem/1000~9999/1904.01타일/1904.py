import sys
sys.stdin = open('input_1904.txt', 'r')

N = int(input())
DP = [0] * (N + 1)
more_before, before, now_value = 1, 2, 0
if N == 1:
    print(1)
elif N == 2:
    print(2)
else:
    for i in range(3, N + 1):
        now_value = more_before + before
        now_value %= 15746
        more_before, before = before, now_value
    print(now_value)