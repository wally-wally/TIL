def solution(arr, divisor):
    answer = []
    for num in arr:
        if not num % divisor:
            answer.append(num)
    if len(answer) == 0:
        return [-1]
    return sorted(answer)

print(solution([5, 9, 7, 10], 5))
print(solution([2, 36, 1, 3], 1))
print(solution([3, 2, 6], 10))