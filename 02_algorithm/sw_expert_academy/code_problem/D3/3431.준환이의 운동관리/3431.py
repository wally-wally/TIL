import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())
for i in range(T):
    arr = list(map(int, input().split()))
    if arr[2] in range(arr[0], arr[1]):
        result = 0
    elif arr[0] > arr[2]:
        result = arr[0] - arr[2]
    elif arr[2] > arr[1]:
        result = -1
    print('#{} {}'.format(i+1, result))