import sys
sys.stdin = open('input_10818.txt', 'r')

N = int(input())
numbers = [int(num) for num in input().split(' ')]
print('{} {}'.format(min(numbers), max(numbers)))