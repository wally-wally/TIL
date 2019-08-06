import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())
arr = [a+1 for a in range(12)]
n = len(arr)
for i in range(T):
    count = 0
    data = list(map(int, input().split()))
    for subset in range(1 << n):
        Sum = 0
        arr_2 = []
        for j in range(n+1):
            if subset & (1<<j):
                arr_2.append(arr[j])
                Sum += arr[j]
        if len(arr_2) == data[0] and Sum == data[1]:
            count += 1
    print('#{} {}'.format(i+1, count))