import sys
sys.stdin = open('input_10250.txt', 'r')

for _ in range(int(input())):
    H, W, N = map(int, input().split())
    Y_num, X_num = N % H, N // H + 1
    if not Y_num:
        Y_num, X_num = H, X_num - 1
    print(Y_num * 100 + X_num)