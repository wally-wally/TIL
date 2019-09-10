def solution(x):
    Sum_value = 0
    for digit in str(x):
        Sum_value += int(digit)
    if not x % Sum_value:
        answer = True
    else:
        answer = False
    return answer

print(10)
print(18)
print(11)
print(12)