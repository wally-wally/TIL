import sys
sys.stdin = open('input_1300.txt', 'r')

N = int(input())
k = int(input())

start, end, result = 1, k, 0

while start <= end:
    mid = (start + end) // 2

    num = 0
    for i in range(1, N + 1):
        num += min(mid // i, N)
    
    if num < k:
        start = mid + 1
    else:
        result = mid
        end = mid - 1

print(result)