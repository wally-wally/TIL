import sys
sys.stdin = open('input_5565.txt', 'r')

total_price = int(input())
sum_price = sum([int(input()) for _ in range(9)])
print(total_price - sum_price)