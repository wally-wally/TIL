import sys
sys.stdin = open('input_10797.txt', 'r')

check_number = int(input())
print(len(list(filter(lambda x: x == check_number, list(map(int, input().split()))))))