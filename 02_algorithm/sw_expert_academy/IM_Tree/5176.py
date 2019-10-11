import sys
sys.stdin = open('input_5176.txt', 'r')

def inorder(n):
    global idx
    if n <= N:
        inorder(n * 2)
        arr[n] = idx
        idx += 1
        inorder(n * 2 + 1)

for tc in range(int(input())):
    N = int(input())
    idx = 1
    arr = [0] * (N + 1)
    inorder(1)
    print('#{} {} {}'.format(tc + 1, arr[1], arr[N // 2]))