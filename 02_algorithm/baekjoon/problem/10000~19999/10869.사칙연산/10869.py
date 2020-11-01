import sys
sys.stdin = open('input_10869.txt', 'r')

A, B = map(int, input().split())
print(A + B)
print(A - B)
print(A * B)
print(A // B)
print(A % B)