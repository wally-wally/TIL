def insertion_sort(a):
    for i in range(1, len(a)):
        for j in range(i, 0, -1):
            if a[j - 1] > a[j]:
                a[j], a[j - 1] = a[j - 1], a[j]

a = [50, 80, 70, 20, 90]

print('정렬 전: ', end='')
print(a)
insertion_sort(a)

print('정렬 후: ', end='')
print(a)