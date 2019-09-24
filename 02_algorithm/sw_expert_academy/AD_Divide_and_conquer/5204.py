import sys
sys.stdin = open('input_5204.txt', 'r')

def mergeSort(lo, hi):  # 매개변수 --> 문제의 크기
    global result
    if lo >= hi:
        return

    # 분할
    mid = (lo + hi - 1) >> 1 # 중간 지점 찾기
    mergeSort(lo, mid) # 왼쪽
    mergeSort(mid + 1, hi) # 오른쪽
    x = arr[lo : mid + 1][-1]
    y = arr[mid + 1 : hi + 1][-1]
    if x > y:
        result += 1

    # 왼쪽과 오른쪽을 병합하여 정렬된 상태로 만듬
    i, j, k = lo, mid + 1, lo
    while i <= mid and j <= hi:
        if arr[i] < arr[j]:
            sort[k] = arr[i]
            k, i = k + 1, i + 1
        else:
            sort[k] = arr[j]
            k, j = k + 1, j + 1

    while i <= mid:
        sort[k] = arr[i]
        k, i = k + 1, i + 1

    while j <= hi:
        sort[k] = arr[j]
        k, j = k + 1, j + 1

    for i in range(lo, hi + 1):
        arr[i] = sort[i]

for test_case in range(int(input())):
    N = int(input())
    arr = list(map(int, input().split()))
    sort = [0] * len(arr)
    result = 0
    mergeSort(0, len(arr) - 1)
    print('#{} {} {}'.format(test_case + 1, arr[N//2], result))

# 강사님 코드
# def mergeSort(lo, hi):
#     global ans
#     if lo + 1 == hi:
#         return arr[lo]

#     mid = (lo + hi) >> 1
    
#     l = mergeSort(lo, mid)
#     r = mergeSort(mid, hi)

#     if i > r:
#         ans += 1
#         return l
#     else:
#         return r

# for test_case in range(int(input())):
#     N = int(input())
#     arr = list(map(int, input().split()))
#     ans = 0
#     mergeSort(0, N)
#     arr.sort()
#     print('#{} {} {}'.format(test_case + 1, arr[N//2], ans))