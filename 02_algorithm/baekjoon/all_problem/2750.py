import sys
sys.stdin = open('input_2750.txt', 'r')

N = int(input())
num_list = []
for _ in range(N):
    num_list.append(int(input()))
for number in sorted(num_list):
    print(number)