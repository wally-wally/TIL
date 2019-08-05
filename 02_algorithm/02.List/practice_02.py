arr = [3, 6, -2, 7, -3, 1, -5, -1, 5, 4]

n = len(arr)

zero_subset_count = 0

for subset in range(1 << n): # subset 은 부분집합을 표현하는 값
    Sum = 0
    result = []
    for j in range(n + 1):
        if subset & (1 << j): # arr[j]를 포함하는지 확인
            result.append(arr[j])
            Sum += arr[j]
    if not Sum:
        zero_subset_count += 1
        print('{:>3}> {}'.format(subset, result))
print('원소의 합이 0이 되는 부분집합의 총 개수 : {}'.format(zero_subset_count))