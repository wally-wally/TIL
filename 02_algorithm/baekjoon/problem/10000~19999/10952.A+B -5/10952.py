import sys
sys.stdin = open('input_10952.txt', 'r')

while True:
    a, b = map(int, input().split())
    if a == b == 0: break
    print(a + b)