import sys
sys.stdin = open('input_2577.txt', 'r')

mul_value = 1
for _ in range(3):
    mul_value *= int(input())

num_list = [0] * 10
for val in str(mul_value):
    num_list[int(val)] += 1

for i in range(10):
    print(num_list[i])