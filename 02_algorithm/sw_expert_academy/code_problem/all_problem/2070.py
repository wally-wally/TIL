T = int(input())

for i in range(T):
    numbers = list(map(int, input().split()))
    if numbers[0] < numbers[1]:
        result = '<'
    elif numbers[0] > numbers[1]:
        result = '>'
    elif numbers[0] == numbers[1]:
        result = '='
    print('#{} {}'.format(i+1, result))