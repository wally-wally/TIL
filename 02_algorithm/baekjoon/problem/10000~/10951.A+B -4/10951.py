import sys
sys.stdin = open('input_10951.txt', 'r')

for _ in range(int(input())):
    A, B = map(int, input().split())
    print(A + B)