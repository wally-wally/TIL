import sys
sys.stdin = open('input.txt', 'r')

count = int(input())
numbers = list(map(int, input().split()))
sorted_numbers = sorted(numbers)
center_position = count // 2
print(sorted_numbers[center_position])