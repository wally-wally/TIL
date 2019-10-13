import sys
sys.stdin = open('input_1929.txt', 'r')

def judge(num):
    if num == 1:
        return False
    n = int(num ** (1 / 2))

    for i in range(2, n + 1):
        if not num % i:
            return False
    return True

M, N = map(int, input().split())
for i in range(M, N + 1):
    if judge(i):
        print(i)