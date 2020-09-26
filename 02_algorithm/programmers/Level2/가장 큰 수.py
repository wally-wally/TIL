def solution(numbers):
    if not sum(numbers):
        return '0'
    stringize_numbers = [str(num) for num in numbers]
    return ''.join(sorted(stringize_numbers, key = lambda x : x * 4, reverse=True))


print(solution([6, 10, 2])) # '6210'
print(solution([3, 30, 34, 5, 9])) # '9534330'