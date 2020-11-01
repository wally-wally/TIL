import sys
sys.stdin = open('input_11721.txt', 'r')

str = input()
str_count = len(str)
for idx in range(0, str_count, 10):
    print(str[idx : idx + 10])