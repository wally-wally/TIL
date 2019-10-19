import sys
sys.stdin = open('input_4153.txt', 'r')

while True:
    numbers = sorted(list(map(int, input().split())))
    if not sum(numbers): break
    print('right' if numbers[0] ** 2 + numbers[1] ** 2 == numbers[2] ** 2 else 'wrong')