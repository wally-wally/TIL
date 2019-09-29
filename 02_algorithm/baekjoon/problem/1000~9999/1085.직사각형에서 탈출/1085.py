import sys
sys.stdin = open('input_1085.txt', 'r')

x, y, w, h = map(int, input().split())
print(min(x, y, w - x, h - y))