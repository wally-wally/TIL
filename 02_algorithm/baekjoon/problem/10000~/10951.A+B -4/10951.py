import sys
sys.stdin = open('input_10951.txt', 'r')

try:
    while True:
        print(sum(map(int, input().split())))
except EOFError:
    pass