def quickSort(a, low, high):
    if low < high:
        pivot = partition(a, low, high)
        quickSort(a, low, pivot-1)
        quickSort(a, pivot+1, high)


def partition(a, pivot, high):
    i = pivot + 1
    j = high
    while True:
        while i < high and a[i] < a[pivot]:
            i += 1
        while j > pivot and a[j] > a[pivot]:
            j -= 1
        if j <= i:
            break
        a[i], a[j] = a[j], a[i]
        i += 1
        j -= 1

    a[pivot], a[j] = a[j], a[pivot]
    return j


a = [54, 88, 77, 26, 93, 17, 49]
print('정렬 전:\t', a)
quickSort(a, 0, len(a)-1)
print('정렬 후:\t', a)