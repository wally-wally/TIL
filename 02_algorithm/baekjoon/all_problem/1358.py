import sys
sys.stdin = open('input_1358.txt', 'r')

W, H, X, Y, P = map(int, input().split())
result = 0
for _ in range(P):
    x_point, y_point = map(int, input().split())
    radius = H // 2
    conditions = [
        X <= x_point <= X + W and Y <= y_point <= Y + H, # 직사각형 범위 판단 
        ((x_point - X) ** 2 + (y_point - (Y + radius)) ** 2) ** (1/2) <= radius, # 좌반원 범위 판단
        ((x_point - (X + W)) ** 2 + (y_point - (Y + radius)) ** 2) ** (1/2) <= radius # 우반원 범위 판단
    ]
    if conditions[0] | conditions[1] | conditions[2]:
        result += 1
print(result)