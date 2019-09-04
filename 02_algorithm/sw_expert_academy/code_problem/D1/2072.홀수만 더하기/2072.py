T = int(input())
for i in range(T):
    numbers = list(map(int, input().split()))
    result = 0
    for j in numbers:
        if j & 1:
            result += j
    print('#{} {}'.format(i+1, result))