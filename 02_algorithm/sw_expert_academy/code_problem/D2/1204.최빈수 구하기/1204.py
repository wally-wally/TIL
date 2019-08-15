import sys
sys.stdin = open('input.txt', 'r')

T = int(input())

for _ in range(T):
    N = int(input())
    arr = [0 for j in range(102)]
    for num in list(map(int, input().split())):
        arr[100-num] += 1
    print('#{} {}'.format(N, 100-arr.index(max(arr))))