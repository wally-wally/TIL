import sys
sys.stdin = open('input_11720.txt', 'r')

N = int(input())
number = input()
print(sum([int(number[n]) for n in range(N)]))