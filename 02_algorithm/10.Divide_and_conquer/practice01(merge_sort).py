# 병합 정렬
arr = [2, 2, 1, 1, 3]
sort = [0] * len(arr)

def mergeSort(lo, hi):  # 매개변수 --> 문제의 크기
    if lo >= hi:
        return

    # 분할
    mid = (lo + hi) >> 1 # 중간 지점 찾기
    mergeSort(lo, mid) # 왼쪽
    mergeSort(mid + 1, hi) # 오른쪽

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


print(arr)
mergeSort(0, len(arr) - 1)
print(arr)