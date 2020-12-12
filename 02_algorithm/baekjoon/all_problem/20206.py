import sys
sys.stdin = open('input_20206.txt', 'r')

A, B, C = map(int, input().split())
x1, x2, y1, y2 = map(int, input().split())

answer = 'Lucky'
if A == 0 and B != 0:
    check_value = 0 if C == 0 else -(C / B)
    if y1 < check_value < y2:
        answer = 'Poor'
elif A != 0 and B == 0:
    check_value = 0 if C == 0 else -(C / A)
    if x1 < check_value < x2:
        answer = 'Poor'
else:
    for i in range(x1, x2 + 1):
        check_value = ((-C - A * i) / B)
        if y1 < check_value < y2:
            answer = 'Poor'
            break
print(answer)