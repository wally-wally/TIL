import sys
sys.stdin = open('input_5543.txt', 'r')

print(min([int(input()) for _ in range(3)]) + min([int(input()) for _ in range(2)]) - 50)