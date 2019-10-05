import sys
sys.stdin = open('input_1712.txt', 'r')

A, B, C = map(int, input().split())
print((A // (C - B)) + 1 if B < C else -1)