import sys
sys.stdin = open('input_1002.txt', 'r')

for _ in range(int(input())):
    x1, y1, r1, x2, y2, r2 = map(int, input().split())
    points_distance = ((abs(x2 - x1)) ** 2 + (abs(y2 - y1)) ** 2) ** (1/2)
    if x1 == x2 and y1 == y2:
        print(-1 if r1 == r2 else 0)
        continue
    if r1 > points_distance + r2 or r2 > points_distance + r1 or points_distance > r1 + r2:
        print(0)
    elif r1 == points_distance + r2 or r2 == points_distance + r1 or points_distance == r1 + r2:
        print(1)
    else:
        print(2)