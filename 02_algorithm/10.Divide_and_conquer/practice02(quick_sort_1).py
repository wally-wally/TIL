# 퀵 정렬(Hoare-Partition)
arr = [3, 2, 4, 6, 9, 1, 8, 7, 5]
def quickSort(lo, hi):
    if lo >= hi: return
    i, j, pivot = lo, hi, arr[lo]
    while i < j:
        while i <= hi and pivot >= arr[i]: i += 1 # 피봇보다 작은 값들만 있으면 오른쪽으로 계속 가므로 오류발생할 수 있는 가능성을 i <= hi를 작성하여 예외 처리를 해준다.
        while pivot < arr[j]: j -= 1
        if i < j:
            arr[i], arr[j] = arr[j], arr[i]
    arr[lo], arr[j] = arr[j], arr[lo]
    quickSort(lo, j - 1)
    quickSort(j + 1, hi)
    
print(arr)
quickSort(0, len(arr) - 1)
print(arr)