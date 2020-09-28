import sys
sys.stdin = open('input_2562.txt', 'r')

numbers = [int(input()) for _ in range(9)]
print(max(numbers))
print(numbers.index(max(numbers)) + 1)