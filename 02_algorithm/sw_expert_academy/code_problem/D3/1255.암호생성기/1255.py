import sys
sys.stdin = open('input.txt', 'r')

for _ in range(10):
    T = int(input())
    numbers = list(map(int, input().split()))
    minus = 0
    while True:
        if minus == 5:
            minus = 0
        minus += 1
        front_number = numbers.pop(0)
        front_number -= minus
        if front_number <= 0:
            front_number = 0
        numbers.append(front_number)
        if not front_number:
            break
    print('#{} {}'.format(T, ' '.join([str(number) for number in numbers])))