import sys
sys.stdin = open('input_2475.txt', 'r')

numbers = map(int, input().split())
valid_number = sum(map(lambda x: x ** 2, numbers)) % 10
print(valid_number)