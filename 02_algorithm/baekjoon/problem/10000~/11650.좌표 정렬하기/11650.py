import sys
sys.stdin = open('input_11650.txt', 'r')

for point in sorted([list(map(int, input().split())) for _ in range(int(input()))]):
    x, y = point
    print(x, y)