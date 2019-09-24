import sys
sys.stdin = open('input_5205.txt', 'r')

def quickSort(lo, hi):
    if lo >= hi: return
    i = lo - 1
    for j in range(lo, hi):
        if arr[hi] >= arr[j]:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    i += 1
    arr[hi], arr[i] = arr[i], arr[hi]

    quickSort(lo, i - 1)
    quickSort(i + 1, hi)

for test_case in range(int(input())):
    N = int(input())
    arr = list(map(int, input().split()))
    quickSort(0, len(arr) - 1)
    print('#{} {}'.format(test_case + 1, arr[N//2]))