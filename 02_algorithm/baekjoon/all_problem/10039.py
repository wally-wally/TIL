import sys
sys.stdin = open('input_10039.txt', 'r')

print(int(sum([40 if num < 40 else num for num in [int(input()) for _ in range(5)]]) / 5))