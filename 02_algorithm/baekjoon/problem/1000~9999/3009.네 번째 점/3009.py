import sys
sys.stdin = open('input_3009.txt', 'r')

x_point, y_point = [], []
for _ in range(3):
    x, y = map(int, input().split())
    x_point.append(x) if x not in x_point else x_point.remove(x)
    y_point.append(y) if y not in y_point else y_point.remove(y)
print(f'{x_point[0]} {y_point[0]}')