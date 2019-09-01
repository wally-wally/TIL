import sys
sys.stdin = open('input.txt', 'r')

def point(num, Sum):
    Sum += 1
    if num == 1:
        return [1, 1]
    else:
        Sum += 1
        start = 2
        while True:
            for i in range(1, Sum):
                if start == num:
                    return [i, Sum - i]
                start += 1
            Sum += 1

def calc(x, y):
    num = 1
    x_value, y_value = 1, 1
    if x == 1 and y == 1:
        return num
    else:
        y_value += 1
        while True:
            while y_value > 0:
                num += 1
                if x_value == x and y_value == y:
                    return num
                x_value += 1
                y_value -= 1
            x_value, y_value = y_value, x_value
            x_value += 1

T = int(input())

for a in range(T):
    p, q = map(int, input().split())
    x, y = 0, 0
    for i in range(2):
        if not i:
            x += (point(p, 1)[i] + point(q, 1)[i])
        else:
            y += (point(p, 1)[i] + point(q, 1)[i])
    print('#{} {}'.format(a + 1, calc(x, y)))