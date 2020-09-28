import sys
sys.stdin = open('input_1259.txt', 'r')

while True:
    numbers = int(input())
    if numbers == 0:
        break
    print('yes' if str(numbers) == str(numbers)[::-1] else 'no')