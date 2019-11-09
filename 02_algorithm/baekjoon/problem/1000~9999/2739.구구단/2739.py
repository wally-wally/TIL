import sys
sys.stdin = open('input_2739.txt', 'r')

N = int(input())
for i in range(1, 10):
    print("{} * {} = {}".format(N, i, N * i))