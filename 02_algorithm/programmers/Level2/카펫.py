def solution(brown, yellow):
    x_value, y_value = yellow, 0
    while True:
        if not yellow % x_value:
            y_value = yellow // x_value
            if 2 * (x_value + y_value) + 4 == brown:
                return [x_value + 2, y_value + 2]
        x_value -= 1


print(solution(10, 2))
print(solution(8, 1))
print(solution(24, 24))