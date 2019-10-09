import sys
sys.stdin = open('input_2669.txt', 'r')

arr = [[0] * 100 for _ in range(100)]
result = 0
for idx in range(4):
    points = list(map(int, input().split()))
    for i in range(points[1], points[3]):
        for j in range(points[0], points[2]):
            if not arr[i][j]:
                arr[i][j] = 1
                result += 1
print(result)